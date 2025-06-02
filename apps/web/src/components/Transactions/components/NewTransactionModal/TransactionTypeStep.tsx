import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faImage } from '@fortawesome/free-solid-svg-icons';
import { ChoiceStep } from '../../../../components/ModalWithSteps/ChoiceStep';
import { useWizard } from '../../../../components/ModalWithSteps/StepsWizard';

export function TransactionTypeStep() {
    const wizard = useWizard();
    const initialChoice = wizard.data.choice;


    return (
        <ChoiceStep
            title="Select Transaction Type"
            description="Choose how you want to add your transaction"
            stepName="choice"
            initialChoice={initialChoice}
            autoNavigate={false}
            options={[
                {
                    id: 'manual',
                    title: 'Manual Entry',
                    description: 'Enter transaction details manually',
                    icon: (
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${initialChoice === 'manual'
                            ? 'bg-[hsl(var(--primary))]'
                            : 'bg-[hsl(var(--muted))]'
                            }`}>
                            <FontAwesomeIcon
                                icon={faReceipt}
                                className={`w-6 h-6 transition-colors ${initialChoice === 'manual'
                                    ? 'text-[hsl(var(--primary-foreground))]'
                                    : 'text-[hsl(var(--muted-foreground))]'
                                    }`}
                            />
                        </div>
                    ),
                },
                {
                    id: 'image',
                    title: 'Upload Receipt',
                    description: 'Upload a receipt for AI processing',
                    icon: (
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${initialChoice === 'image'
                            ? 'bg-[hsl(var(--primary))]'
                            : 'bg-[hsl(var(--muted))]'
                            }`}>
                            <FontAwesomeIcon
                                icon={faImage}
                                className={`w-6 h-6 transition-colors ${initialChoice === 'image'
                                    ? 'text-[hsl(var(--primary-foreground))]'
                                    : 'text-[hsl(var(--muted-foreground))]'
                                    }`}
                            />
                        </div>
                    ),
                },
            ]}
        />
    );
}


