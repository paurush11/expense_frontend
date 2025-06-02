import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { UseMutationOptions } from '@tanstack/react-query';

/** Finite–state graph --------------------------------------------------- */
export type StepId = string;

export interface StepNode {
    id: StepId;
    title: string;
    Component: React.ComponentType<any>;
    /**
     * Returns the id of the next node OR null to finish.
     * You have access to the accumulated wizard data.
     */
    next: (data: any) => StepId | null;
    /**
     * Optional hook that runs before the wizard leaves this step.
     * Great place for react-query mutations / validations.
     * Throw to block navigation.
     */
    beforeLeave?: (data: any) => Promise<void> | void;
    /**
     * Optional mutation configuration for the step.
     * This will be used by the step components to handle data submission.
     */
    mutation?: UseMutationOptions<any, unknown, any>;
    isTerminal?: boolean;
}

export interface PredefinedChoiceOption {
    value: string;
    label: string;
}

export interface WizardGraph {
    /** Adjacency list – every node must appear exactly once */
    nodes: Record<StepId, StepNode>;
    /** First step */
    start: StepId;
    choices?: Record<string, PredefinedChoiceOption[]>; // Optional global choices
}

/** ---------------------------------------------------------------------- */
interface WizardState {
    current: StepId;
    data: Record<string, any>;
    history: StepId[]; // Track step history for back navigation
}

type WizardAction =
    | { type: 'BACK' }
    | { type: 'NEXT'; next: StepId | null; payload?: any }
    | { type: 'JUMP'; to: StepId }
    | { type: 'RESET'; start: StepId }

function reducer(state: WizardState, action: WizardAction): WizardState {
    switch (action.type) {
        case 'BACK':
            if (state.history.length === 0) return state;
            const prevStep = state.history[state.history.length - 1];
            return {
                ...state,
                current: prevStep,
                history: state.history.slice(0, -1)
            };

        case 'NEXT':
            if (!action.next) return state;
            return {
                current: action.next,
                data: { ...state.data, ...action.payload },
                history: [...state.history, state.current]
            };

        case 'JUMP':
            return {
                ...state,
                current: action.to,
                history: [] // Clear history when jumping
            };

        case 'RESET':
            return {
                current: action.start,
                data: {},
                history: []
            };

        default:
            return state;
    }
}

/** context */
export const WizardCtx = createContext<{
    graph: WizardGraph;
    state: WizardState;
    dispatch: React.Dispatch<WizardAction>;
} | null>(null);

export function StepsWizardProvider({
    graph,
    children,
}: {
    graph: WizardGraph;
    children: ReactNode;
}) {
    const [state, dispatch] = useReducer(reducer, {
        current: graph.start,
        data: {},
        history: []
    });

    return (
        <WizardCtx.Provider value={{ graph, state, dispatch }}>
            {children}
        </WizardCtx.Provider>
    );
}

/** Hook consumed inside steps */
export function useWizard() {
    const ctx = useContext(WizardCtx);
    if (!ctx) throw new Error('useWizard must be inside StepsWizardProvider');

    const { graph, state, dispatch } = ctx;
    const node = graph.nodes[state.current];
    if (!node) {
        throw new Error(`Invalid step: ${state.current}`);
    }

    // Create a fallback node if the current node is invalid
    const fallbackNode: StepNode = {
        id: graph.start,
        title: graph.nodes[graph.start].title,
        Component: graph.nodes[graph.start].Component,
        next: () => graph.start
    };

    const currentNode = node || fallbackNode;

    return {
        id: currentNode.id,
        title: currentNode.title,
        data: state.data,
        update: (payload: any) => dispatch({ type: 'NEXT', next: state.current, payload }),
        back: () => dispatch({ type: 'BACK' }),
        next: (payload?: any) => {
            const mergedData = { ...state.data, ...payload };
            const nxt = currentNode.next(mergedData);
            if (!nxt && !currentNode.isTerminal) {
                return;
            }
            dispatch({ type: 'NEXT', next: nxt, payload });
        },
        jump: (to: StepId) => dispatch({ type: 'JUMP', to }),
        isFirst: state.history.length === 0,
        isLast: !!currentNode.isTerminal,
    };
}

/** Types for graph definition with explicit edges */
type Edge<TData = any> = {
    to: StepId;
    condition: (data: TData) => boolean;
};

type StepDefinition<TData = any> = {
    title: string;
    Component: React.ComponentType<any>;
    edges: Edge<TData>[];
    beforeLeave?: (data: TData) => Promise<void> | void;
    mutation?: UseMutationOptions<any, unknown, any>;
    isTerminal?: boolean;
};

type GraphDefinition<TData = any> = {
    start: StepId;
    nodes: Record<StepId, StepDefinition<TData>>;
    choices?: Record<string, PredefinedChoiceOption[]>; // Add choices here as well
};

/** Helper function to create a type-safe graph with explicit edges */
export function createGraph<TData = any>(definition: GraphDefinition<TData>): WizardGraph {
    const nodes: Record<StepId, StepNode> = {};
    for (const [id, nodeDef] of Object.entries(definition.nodes)) {
        nodes[id] = {
            id,
            title: nodeDef.title,
            Component: nodeDef.Component,
            beforeLeave: nodeDef.beforeLeave,
            mutation: nodeDef.mutation,
            isTerminal: nodeDef.isTerminal,
            next: (data: TData) => {
                const edge = nodeDef.edges.find(edge => edge.condition(data));
                return edge?.to ?? null;
            }
        };
    }
    return {
        start: definition.start,
        nodes,
        choices: definition.choices, // Pass choices to the final WizardGraph object
    };
}

// Helper function to create an edge
export function edge<TData = any>(to: StepId, condition: (data: TData) => boolean): Edge<TData> {
    return { to, condition };
}

// Helper function to create a default edge (always true)
export function defaultEdge(to: StepId): Edge<any> {
    return { to, condition: () => true };
}

/**
 * Generates a Mermaid syntax string for visualizing the wizard graph.
 * @param graphDefinition The graph definition object.
 * @returns A string representing the graph in Mermaid syntax.
 */
export function generateMermaidDiagram(graphDefinition: GraphDefinition<any>): string {
    let mermaidString = 'graph TD;\n'; // TD for TopDown, could be LR for LeftRight

    // Add nodes
    for (const nodeId in graphDefinition.nodes) {
        const node = graphDefinition.nodes[nodeId];
        mermaidString += `    ${nodeId}["${node.title || nodeId}"];\n`;
    }

    // Add edges
    for (const nodeId in graphDefinition.nodes) {
        const node = graphDefinition.nodes[nodeId];
        if (node.edges && node.edges.length > 0) {
            node.edges.forEach(edge => {
                // For conditional edges, the label could indicate the condition if desired,
                // but Mermaid conditions are typically more complex to represent textually on the edge.
                // For now, just showing the transition.
                // If the condition is from defaultEdge, it means () => true
                const isDefault = edge.condition.toString() === '() => true';
                if (isDefault) {
                    mermaidString += `    ${nodeId} -->|"Default"| ${edge.to};\n`;
                } else {
                    // Could try to extract a meaningful label from edge.condition.toString(),
                    // but it can be very complex and verbose.
                    // Example: data => data.choice === 'manual'
                    let conditionLabel = edge.condition.toString().replace(/\s*=>\s*/, ' ');
                    conditionLabel = conditionLabel.replace(/data\./g, ''); // Simplify
                    conditionLabel = conditionLabel.replace(/===/g, 'is');
                    conditionLabel = conditionLabel.replace(/\{|\}|return|;/g, '').trim();
                    if (conditionLabel.length > 30) conditionLabel = 'Conditional'; // Keep labels short

                    mermaidString += `    ${nodeId} -- "${conditionLabel}" --> ${edge.to};\n`;
                }
            });
        }
    }
    if (graphDefinition.start) {
        mermaidString += `    style ${graphDefinition.start} fill:#f9f,stroke:#333,stroke-width:4px\n`;
    }

    return mermaidString;
}

// Builder Pattern for Graph Definition
interface BuilderNodeOptions<TData> {
    title: string;
    beforeLeave?: (data: TData) => Promise<void> | void;
    mutation?: UseMutationOptions<any, unknown, any>;
    isTerminal?: boolean;
}

interface InternalBuilderNodeDefinition<TData> extends BuilderNodeOptions<TData> {
    Component: React.ComponentType<any>;
}

interface InternalBuilderEdgeDefinition<TData> {
    from: StepId;
    to: StepId;
    condition?: (data: TData) => boolean; // Undefined condition implies a default edge
}

export class WizardGraphBuilder<TData = any> {
    private nodeDefinitions: Record<StepId, InternalBuilderNodeDefinition<TData>> = {};
    private edgeDefinitions: Array<InternalBuilderEdgeDefinition<TData>> = [];
    private currentStartNodeId?: StepId;
    private predefinedChoices: Record<string, PredefinedChoiceOption[]> = {}; // Add storage for choices

    addNode(id: StepId, component: React.ComponentType<any>, options: BuilderNodeOptions<TData>): this {
        if (this.nodeDefinitions[id]) {
            console.warn(`[WizardGraphBuilder] Node '${id}' is being redefined.`);
        }
        this.nodeDefinitions[id] = { Component: component, ...options };
        return this;
    }

    addConditionalEdge(from: StepId, to: StepId, condition: (data: TData) => boolean): this {
        if (!this.nodeDefinitions[from]) {
            throw new Error(`[WizardGraphBuilder] Source node '${from}' for edge not defined. Add it first using addNode().`);
        }
        if (!this.nodeDefinitions[to]) {
            throw new Error(`[WizardGraphBuilder] Target node '${to}' for edge not defined. Add it first using addNode().`);
        }
        this.edgeDefinitions.push({ from, to, condition });
        return this;
    }

    addDefaultEdge(from: StepId, to: StepId): this {
        if (!this.nodeDefinitions[from]) {
            throw new Error(`[WizardGraphBuilder] Source node '${from}' for edge not defined. Add it first using addNode().`);
        }
        if (!this.nodeDefinitions[to]) {
            throw new Error(`[WizardGraphBuilder] Target node '${to}' for edge not defined. Add it first using addNode().`);
        }
        // A default edge has no specific condition (it will be treated as always true later)
        this.edgeDefinitions.push({ from, to });
        return this;
    }

    setStartNode(id: StepId): this {
        if (!this.nodeDefinitions[id]) {
            throw new Error(`[WizardGraphBuilder] Attempted to set start node '${id}', but it has not been added via addNode().`);
        }
        this.currentStartNodeId = id;
        return this;
    }

    addChoiceSet(choiceKey: string, options: PredefinedChoiceOption[]): this {
        if (this.predefinedChoices[choiceKey]) {
            console.warn(`[WizardGraphBuilder] Choice set '${choiceKey}' is being redefined.`);
        }
        this.predefinedChoices[choiceKey] = options;
        return this;
    }

    getGraphDefinition(): GraphDefinition<TData> {
        if (!this.currentStartNodeId) {
            throw new Error("[WizardGraphBuilder] Start node must be set using setStartNode() before getting graph definition.");
        }

        const graphDefNodes: Record<StepId, StepDefinition<TData>> = {};
        for (const nodeId in this.nodeDefinitions) {
            const nodeInfo = this.nodeDefinitions[nodeId];
            const outgoingEdges: Edge<TData>[] = this.edgeDefinitions
                .filter(edge => edge.from === nodeId)
                .map(builderEdge => ({
                    to: builderEdge.to,
                    condition: builderEdge.condition || (() => true)
                }));

            graphDefNodes[nodeId] = {
                title: nodeInfo.title,
                Component: nodeInfo.Component,
                edges: outgoingEdges,
                beforeLeave: nodeInfo.beforeLeave,
                mutation: nodeInfo.mutation,
                isTerminal: nodeInfo.isTerminal,
            };
        }

        return {
            start: this.currentStartNodeId!,
            nodes: graphDefNodes,
            choices: this.predefinedChoices, // Include choices in the definition
        };
    }

    build(): WizardGraph {
        const graphDefinition = this.getGraphDefinition();
        return createGraph<TData>(graphDefinition);
    }
}

/**
 * Generates a Mermaid syntax string for visualizing the graph from a WizardGraphBuilder instance.
 * @param builder The WizardGraphBuilder instance.
 * @returns A string representing the graph in Mermaid syntax.
 */
export function generateMermaidDiagramFromBuilder<TData>(builder: WizardGraphBuilder<TData>): string {
    let mermaidString = 'graph TD;\n';
    // Access private members for diagram generation (this is a common pattern for helper functions)
    const nodeDefinitions = (builder as any).nodeDefinitions as Record<StepId, InternalBuilderNodeDefinition<TData>>;
    const edgeDefinitions = (builder as any).edgeDefinitions as Array<InternalBuilderEdgeDefinition<TData>>;
    const startNodeId = (builder as any).currentStartNodeId as StepId | undefined;

    for (const nodeId in nodeDefinitions) {
        mermaidString += `    ${nodeId}["${nodeDefinitions[nodeId].title || nodeId}"];\n`;
    }

    edgeDefinitions.forEach(edge => {
        if (edge.condition) {
            let conditionLabel = edge.condition.toString().replace(/\s*=>\s*/, ' ');
            conditionLabel = conditionLabel.replace(/data\./g, '');
            conditionLabel = conditionLabel.replace(/===/g, 'is');
            conditionLabel = conditionLabel.replace(/\{|\}|return|;/g, '').trim();
            if (conditionLabel.length > 30) conditionLabel = 'Conditional';
            mermaidString += `    ${edge.from} -- "${conditionLabel}" --> ${edge.to};\n`;
        } else {
            mermaidString += `    ${edge.from} -->|"Default"| ${edge.to};\n`;
        }
    });

    if (startNodeId && nodeDefinitions[startNodeId]) {
        mermaidString += `    style ${startNodeId} fill:#f9f,stroke:#333,stroke-width:4px\n`;
    }
    return mermaidString;
} 