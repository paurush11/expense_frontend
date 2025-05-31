import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';

// Graph-based step structure
type StepId = string;
interface StepNode {
    id: StepId;
    title: string;
    component: React.ComponentType<any>;
    next: (data: any) => StepId | null;
    prev?: StepId[];
}

interface StepsModalProps {
    isOpen: boolean;
    onClose: () => void;
    stepGraph: Record<StepId, StepNode>;
    orderedSteps: StepId[];
    currentStep: StepId;
    setCurrentStep: (step: StepId) => void;
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: (data: any) => void;
    title?: string;
    showProgress?: boolean;
    showSkip?: boolean;
    onEditStep?: () => void;
}

export function StepsModal({
    isOpen,
    onClose,
    stepGraph,
    orderedSteps,
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    onSubmit,
    title = 'Steps',
    showProgress = true,
    showSkip = true,
    onEditStep
}: StepsModalProps) {
    // Compute enabled steps based on formData and graph
    const getEnabledSteps = () => {
        const enabled: StepId[] = [orderedSteps[0]];
        let data = { ...formData };
        let step: StepId = orderedSteps[0];
        while (true) {
            const next: StepId | null = stepGraph[step].next(data);
            if (!next || enabled.includes(next)) break;
            enabled.push(next);
            step = next;
        }
        return enabled;
    };
    const enabledSteps = getEnabledSteps();
    const StepComponent = stepGraph[currentStep].component;

    // Find previous and next steps for navigation
    const prevStep = stepGraph[currentStep].prev && stepGraph[currentStep].prev?.find((s) => enabledSteps.includes(s));
    const nextStep = stepGraph[currentStep].next(formData);
    const isLastStep = currentStep === orderedSteps[orderedSteps.length - 1];

    // Check if current step is complete using static method
    const isStepComplete = (StepComponent as any).isStepComplete
        ? (StepComponent as any).isStepComplete(formData)
        : true;

    const handleStepSubmit = (data: any) => {
        const newData = { ...formData, ...data };
        setFormData(newData);
        const nextStepId = stepGraph[currentStep].next(newData);
        if (nextStepId) {
            setCurrentStep(nextStepId);
        } else {
            onSubmit(newData);
        }
    };

    const handleBack = () => {
        const prev = stepGraph[currentStep].prev;
        if (prev && prev.length > 0) {
            for (let i = prev.length - 1; i >= 0; i--) {
                if (enabledSteps.includes(prev[i])) {
                    setCurrentStep(prev[i]);
                    return;
                }
            }
        }
        onClose();
    };

    const handleNext = () => {
        if (nextStep && isStepComplete) {
            setCurrentStep(nextStep);
        }
    };

    const handleJump = (step: StepId) => {
        if (enabledSteps.includes(step)) {
            setCurrentStep(step);
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl mx-4">
                <div className="bg-[hsl(var(--card))] rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-[hsl(var(--border))]">
                        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    {/* Progress Bar / Graph */}
                    {showProgress && (
                        <div className="px-4 py-2 border-b border-[hsl(var(--border))]">
                            <div className="flex items-center">
                                {orderedSteps.map((step, idx) => (
                                    <React.Fragment key={step}>
                                        <button
                                            type="button"
                                            className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors
                                                ${currentStep === step ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' :
                                                    enabledSteps.includes(step) ? 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.2)]' :
                                                        'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] opacity-50 cursor-not-allowed'}
                                            `}
                                            disabled={!enabledSteps.includes(step)}
                                            onClick={() => handleJump(step)}
                                        >
                                            {stepGraph[step].title}
                                        </button>
                                        {idx < orderedSteps.length - 1 && (
                                            <span className="mx-1 text-[hsl(var(--muted-foreground))]">→</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                        <StepComponent
                            data={formData}
                            onSubmit={handleStepSubmit}
                            onBack={handleBack}
                            onEdit={onEditStep}
                        />
                    </div>

                    {/* Footer Navigation */}
                    <div className="flex justify-between items-center p-4 border-t border-[hsl(var(--border))]">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="btn btn-outline"
                            disabled={!prevStep}
                        >
                            Previous
                        </button>
                        {isLastStep ? (
                            <button
                                type="button"
                                onClick={() => onSubmit(formData)}
                                className="btn btn-success"
                                disabled={!isStepComplete}
                            >
                                Submit
                            </button>
                        ) : (
                            nextStep && (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="btn btn-primary"
                                    disabled={!isStepComplete}
                                >
                                    Next
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const modalRoot = typeof window !== 'undefined' ? document.getElementById('modal-root') : null;
    if (modalRoot) {
        return ReactDOM.createPortal(modalContent, modalRoot);
    }
    return modalContent;
} 