import React from 'react';

interface IndividualExpenseStepProps {
    data?: any;
    onSubmit?: (data: any) => void;
}

export function IndividualExpenseStep({ data, onSubmit }: IndividualExpenseStepProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const expenseData = {
            amount: formData.get('amount'),
            category: formData.get('category'),
            description: formData.get('description'),
            date: formData.get('date'),
        };
        onSubmit?.(expenseData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Expense Details</h2>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="amount" className="text-sm font-medium text-[hsl(var(--foreground))]">Amount</label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        required
                        placeholder="Enter amount"
                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium text-[hsl(var(--foreground))]">Category</label>
                    <select
                        id="category"
                        name="category"
                        required
                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    >
                        <option value="">Select category</option>
                        <option value="food">Food & Dining</option>
                        <option value="transport">Transportation</option>
                        <option value="shopping">Shopping</option>
                        <option value="utilities">Utilities</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-[hsl(var(--foreground))]">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter expense description"
                        required
                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-[100px]"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium text-[hsl(var(--foreground))]">Date</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    />
                </div>
            </div>
        </form>
    );
} 