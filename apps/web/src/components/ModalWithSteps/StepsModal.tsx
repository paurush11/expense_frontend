import React, { useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useWizard, StepsWizardProvider, WizardGraph, WizardCtx } from './StepsWizard';
import { FormStepHandles } from './FormStep';

function ModalFrame({ onClose, onSubmit }: { onClose: () => void; onSubmit?: (data: Record<string, any>) => void; }) {
    const wizard = useWizard();
    const ctx = useContext(WizardCtx);
    if (!ctx) throw new Error('ModalFrame must be used within StepsWizardProvider');
    const Step = ctx.graph.nodes[wizard.id].Component;
    const hideFooter = (Step as any).hideFooter;
    const stepRef = useRef<FormStepHandles>(null);

    const handleNext = async () => {
        if (wizard.isLast) {
            if (onSubmit) {
                if (stepRef.current && typeof stepRef.current.triggerSubmit === 'function') {
                    await stepRef.current.triggerSubmit();
                }
                onSubmit(wizard.data);
            }
            onClose();
        } else {
            try {
                if (stepRef.current && typeof stepRef.current.triggerSubmit === 'function') {
                    await stepRef.current.triggerSubmit();
                } else {
                    wizard.next();
                }
            } catch (error) {
                console.error('Navigation error in handleNext:', error);
            }
        }
    };

    return (
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
                            {wizard.title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                        {React.createElement(Step, {
                            data: wizard.data,
                            ref: (Step as any).displayName === 'FormStep' ? stepRef : undefined
                        })}
                    </div>

                    {/* Footer Navigation */}
                    {!hideFooter && (
                        <div className="flex justify-between items-center p-4 border-t border-[hsl(var(--border))]">
                            <button
                                type="button"
                                onClick={wizard.back}
                                className="btn btn-outline"
                                disabled={wizard.isFirst}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="btn btn-primary"
                                disabled={!ctx.graph.nodes[wizard.id].next(wizard.data) && !wizard.isLast}
                            >
                                {wizard.isLast ? 'Submit' : 'Next'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/** Public component */
export function StepsModal({
    isOpen,
    onClose,
    graph,
    onSubmit,
}: {
    isOpen: boolean;
    onClose: () => void;
    graph: WizardGraph;
    onSubmit?: (data: Record<string, any>) => void;
}) {
    if (!isOpen) return null;

    const modalContent = (
        <StepsWizardProvider graph={graph}>
            <ModalFrame onClose={onClose} onSubmit={onSubmit} />
        </StepsWizardProvider>
    );

    const modalRoot = typeof window !== 'undefined' ? document.getElementById('modal-root') : null;
    if (modalRoot) {
        return ReactDOM.createPortal(modalContent, modalRoot);
    }
    return modalContent;
} 