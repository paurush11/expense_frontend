import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

interface ExpenseTypeStepProps {
    data?: any;
    onSubmit?: (data: any) => void;
}

export function ExpenseTypeStep({ data, onSubmit }: ExpenseTypeStepProps) {
    const handleTypeSelect = (type: 'individual' | 'group') => {
        onSubmit?.({ expenseType: type });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Select Expense Type</h2>
            <div className="grid grid-cols-2 gap-4">
                <div
                    className="card p-6 cursor-pointer hover:border-[hsl(var(--primary))] transition-colors"
                    onClick={() => handleTypeSelect('individual')}
                >
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="w-6 h-6 text-[hsl(var(--primary-foreground))]"
                            />
                        </div>
                        <h3 className="text-lg font-medium">Individual Expense</h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] text-center">
                            Personal expense for yourself
                        </p>
                    </div>
                </div>

                <div
                    className="card p-6 cursor-pointer hover:border-[hsl(var(--primary))] transition-colors"
                    onClick={() => handleTypeSelect('group')}
                >
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                            <FontAwesomeIcon
                                icon={faUsers}
                                className="w-6 h-6 text-[hsl(var(--primary-foreground))]"
                            />
                        </div>
                        <h3 className="text-lg font-medium">Group Expense</h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] text-center">
                            Shared expense with others
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 