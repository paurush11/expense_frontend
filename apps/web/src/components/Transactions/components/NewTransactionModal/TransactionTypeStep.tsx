import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faImage } from '@fortawesome/free-solid-svg-icons';

interface TransactionTypeStepProps {
    data?: any;
    onSubmit?: (data: any) => void;
}

export function TransactionTypeStep({ data, onSubmit }: TransactionTypeStepProps) {
    const handleTypeSelect = (type: 'image' | 'manual') => {
        onSubmit?.({ transactionType: type });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Select Transaction Type</h2>
            <div className="grid grid-cols-2 gap-4">
                <div
                    className="card p-6 cursor-pointer hover:border-[hsl(var(--primary))] transition-colors"
                    onClick={() => handleTypeSelect('manual')}
                >
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                            <FontAwesomeIcon
                                icon={faReceipt}
                                className="w-6 h-6 text-[hsl(var(--primary-foreground))]"
                            />
                        </div>
                        <h3 className="text-lg font-medium">Manual Transaction</h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] text-center">
                            Enter transaction details manually
                        </p>
                    </div>
                </div>

                <div
                    className="card p-6 cursor-pointer hover:border-[hsl(var(--primary))] transition-colors"
                    onClick={() => handleTypeSelect('image')}
                >
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                            <FontAwesomeIcon
                                icon={faImage}
                                className="w-6 h-6 text-[hsl(var(--primary-foreground))]"
                            />
                        </div>
                        <h3 className="text-lg font-medium">Upload Receipt</h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] text-center">
                            Upload an image of your receipt
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 