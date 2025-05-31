import React from 'react';

interface AdditionalDetailsStepProps {
    data?: any;
    onSubmit?: (data: any) => void;
}

export function AdditionalDetailsStep({ data, onSubmit }: AdditionalDetailsStepProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const additionalData = {
            paymentMethod: formData.get('paymentMethod'),
            location: formData.get('location'),
            notes: formData.get('notes'),
            tags: formData.get('tags')?.toString().split(',').map(tag => tag.trim()) || []
        };
        onSubmit?.(additionalData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Additional Details</h2>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="paymentMethod" className="text-sm font-medium text-[hsl(var(--foreground))]">Payment Method</label>
                    <select
                        id="paymentMethod"
                        name="paymentMethod"
                        required
                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    >
                        <option value="">Select payment method</option>
                        <option value="cash">Cash</option>
                        <option value="credit">Credit Card</option>
                        <option value="debit">Debit Card</option>
                        <option value="upi">UPI</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium text-[hsl(var(--foreground))]">Location</label>
                    <input
                        id="location"
                        name="location"
                        placeholder="Enter location (optional)"
                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="tags" className="text-sm font-medium text-[hsl(var(--foreground))]">Tags</label>
                    <input
                        id="tags"
                        name="tags"
                        placeholder="Enter tags separated by commas (optional)"
                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium text-[hsl(var(--foreground))]">Additional Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        placeholder="Enter any additional notes (optional)"
                        rows={4}
                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    />
                </div>
            </div>
        </form>
    );
} 