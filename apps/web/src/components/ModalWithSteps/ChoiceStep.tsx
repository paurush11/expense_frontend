import React, { useState, useCallback } from 'react';
import { useWizard } from './StepsWizard';

interface ChoiceOption {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface ChoiceStepProps {
    title: string;
    description: string;
    options: ChoiceOption[];
    stepName: string; // Name of the step for data submission
    initialChoice?: string;
    autoNavigate?: boolean; // New prop, defaults to true for backward compatibility
}

export function ChoiceStep({
    title,
    description,
    options,
    stepName,
    initialChoice,
    autoNavigate = true, // Default to true
}: ChoiceStepProps) {
    const wizard = useWizard();
    const [selectedChoice, setSelectedChoice] = useState<string | undefined>(initialChoice);

    const handleChoiceClick = useCallback((choiceId: string) => {
        setSelectedChoice(choiceId);
        const payload = { [stepName]: choiceId };
        if (autoNavigate) {
            wizard.next(payload);
        } else {
            wizard.update(payload);
        }
    }, [stepName, wizard, autoNavigate]);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">
                    {title}
                </h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {description}
                </p>
            </div>

            <div className="grid gap-4">
                {options.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => handleChoiceClick(option.id)}
                        className={`w-full p-4 rounded-lg border transition-all ${selectedChoice === option.id
                            ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5'
                            : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/5'
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            {option.icon}
                            <div className="flex-1 text-left">
                                <h3 className={`font-medium ${selectedChoice === option.id
                                    ? 'text-[hsl(var(--primary))]'
                                    : 'text-[hsl(var(--foreground))]'
                                    }`}>
                                    {option.title}
                                </h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                    {option.description}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}