import React, { useState } from 'react';

interface Step {
    id: string;
    title: string;
    component: React.ComponentType<{
        data?: any;
        onSubmit: (data: any) => void;
        onBack?: () => void;
    }>;
}

interface Flow {
    id: string;
    steps: string[];
}

interface TransactionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    steps: Record<string, Step>;
    flows: Flow[];
    initialFlow: string;
    onSubmit: (data: any) => void;
    onFlowChange?: (flow: string) => void;
}

export function TransactionDialog({
    isOpen,
    onClose,
    steps,
    flows,
    initialFlow,
    onSubmit,
    onFlowChange
}: TransactionDialogProps) {
    const [currentFlow, setCurrentFlow] = useState(initialFlow);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [formData, setFormData] = useState<any>({});

    if (!isOpen) return null;

    const currentFlowConfig = flows.find(flow => flow.id === currentFlow);
    if (!currentFlowConfig) return null;

    const currentStepId = currentFlowConfig.steps[currentStepIndex];
    const currentStep = steps[currentStepId];

    const handleStepSubmit = (data: any) => {
        const newData = { ...formData, ...data };
        setFormData(newData);

        // Handle flow changes based on step data
        if (currentStepId === 'transactionType' && data.transactionType === 'image') {
            onFlowChange?.('image');
            setCurrentFlow('image');
            setCurrentStepIndex(currentFlowConfig.steps.length - 1); // Go to review
            return;
        }

        if (currentStepId === 'expenseType') {
            const newFlow = data.expenseType === 'group' ? 'group' : 'individual';
            onFlowChange?.(newFlow);
            setCurrentFlow(newFlow);
            setCurrentStepIndex(0); // Reset to first step of new flow
            return;
        }

        // Move to next step
        if (currentStepIndex < currentFlowConfig.steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            onSubmit(newData);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        } else {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[hsl(var(--background))] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
                            {currentStep.title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="relative">
                        {React.createElement(currentStep.component, {
                            data: formData,
                            onSubmit: handleStepSubmit,
                            onBack: handleBack
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
} 