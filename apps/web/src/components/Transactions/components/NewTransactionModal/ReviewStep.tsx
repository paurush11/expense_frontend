import React from 'react';

interface ReviewStepProps {
    data?: any;
    onSubmit?: (data: any) => void;
    onBack?: () => void;
    onEdit?: () => void;
}

const formatCurrency = (amount: number | string) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(num);
};

export function ReviewStep({ data, onSubmit, onBack, onEdit }: ReviewStepProps) {
    const handleSubmit = () => {
        onSubmit?.(data);
    };

    const handleEdit = () => {
        if (onEdit) onEdit();
        else if (onBack) onBack();
    };

    const renderTransactionDetails = () => {
        if (data?.transactionType === 'image') {
            return (
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[hsl(var(--foreground))]">Receipt Image</h3>
                    <div className="aspect-video bg-[hsl(var(--muted))] rounded-lg flex items-center justify-center">
                        {data.imageUrl ? (
                            <img
                                src={data.imageUrl}
                                alt="Receipt"
                                className="max-w-full max-h-full object-contain"
                            />
                        ) : (
                            <p className="text-[hsl(var(--muted-foreground))]">No image uploaded</p>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[hsl(var(--foreground))]">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Amount</p>
                            <p className="font-medium text-[hsl(var(--foreground))]">{formatCurrency(data?.amount || data?.totalAmount)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Date</p>
                            <p className="font-medium text-[hsl(var(--foreground))]">{data?.date}</p>
                        </div>
                        <div>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Category</p>
                            <p className="font-medium text-[hsl(var(--foreground))]">{data?.category}</p>
                        </div>
                        <div>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Description</p>
                            <p className="font-medium text-[hsl(var(--foreground))]">{data?.description}</p>
                        </div>
                    </div>
                </div>

                {data?.expenseType === 'group' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-[hsl(var(--foreground))]">Group Details</h3>
                        <div className="space-y-2">
                            {data?.members?.map((member: any, index: number) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="text-[hsl(var(--foreground))]">{member.name}</span>
                                    <span className="font-medium text-[hsl(var(--foreground))]">{formatCurrency(member.share)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[hsl(var(--foreground))]">Additional Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">Payment Method</p>
                            <p className="font-medium text-[hsl(var(--foreground))]">{data?.paymentMethod}</p>
                        </div>
                        {data?.location && (
                            <div>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Location</p>
                                <p className="font-medium text-[hsl(var(--foreground))]">{data.location}</p>
                            </div>
                        )}
                        {data?.tags?.length > 0 && (
                            <div className="col-span-2">
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Tags</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {data.tags.map((tag: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-[hsl(var(--muted))] rounded-full text-sm text-[hsl(var(--foreground))]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {data?.notes && (
                            <div className="col-span-2">
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Notes</p>
                                <p className="font-medium text-[hsl(var(--foreground))]">{data.notes}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Review Transaction</h2>

            <div className="card p-6">
                {renderTransactionDetails()}
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleEdit}
                    className="btn btn-outline"
                >
                    Edit
                </button>
            </div>
        </div>
    );
} 