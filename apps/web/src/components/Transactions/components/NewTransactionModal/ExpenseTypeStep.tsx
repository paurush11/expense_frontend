import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ChoiceStep } from '../../../../components/ModalWithSteps/ChoiceStep';
import { useWizard } from '../../../../components/ModalWithSteps/StepsWizard';

export function ExpenseTypeStep() {
    const wizard = useWizard();
    const initialChoice = wizard.data.expenseType;

    return (
        <ChoiceStep
            title="Select Expense Type"
            description="Choose whether this is an individual or group expense"
            stepName="expenseType"
            initialChoice={initialChoice}
            autoNavigate={false}
            options={[
                {
                    id: 'individual',
                    title: 'Individual Expense',
                    description: 'Add an expense for yourself',
                    icon: (
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${initialChoice === 'individual'
                            ? 'bg-[hsl(var(--primary))]'
                            : 'bg-[hsl(var(--muted))]'
                            }`}>
                            <FontAwesomeIcon
                                icon={faUser}
                                className={`w-6 h-6 transition-colors ${initialChoice === 'individual'
                                    ? 'text-[hsl(var(--primary-foreground))]'
                                    : 'text-[hsl(var(--muted-foreground))]'
                                    }`}
                            />
                        </div>
                    ),
                },
                {
                    id: 'group',
                    title: 'Group Expense',
                    description: 'Add an expense to split with others',
                    icon: (
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${initialChoice === 'group'
                            ? 'bg-[hsl(var(--primary))]'
                            : 'bg-[hsl(var(--muted))]'
                            }`}>
                            <FontAwesomeIcon
                                icon={faUsers}
                                className={`w-6 h-6 transition-colors ${initialChoice === 'group'
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