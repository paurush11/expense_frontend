import { ExpenseFormData } from '../../../types/expense'

interface PaymentStepProps {
    onNext: (data: Partial<ExpenseFormData>) => void
    onBack: () => void
    initialData?: Partial<ExpenseFormData>
}

export const PaymentStep = ({ onNext, onBack, initialData }: PaymentStepProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const receipt = formData.get('receipt')
        const data = {
            paymentMethod: formData.get('paymentMethod') as string,
            receipt: receipt ? (receipt as File) : undefined
        }
        onNext(data)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                    Payment Method
                </label>
                <select
                    id="paymentMethod"
                    name="paymentMethod"
                    required
                    defaultValue={initialData?.paymentMethod}
                    className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-[hsl(var(--foreground))]"
                >
                    <option value="">Select a payment method</option>
                    <option value="cash">Cash</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="receipt" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                    Receipt (Optional)
                </label>
                <input
                    type="file"
                    id="receipt"
                    name="receipt"
                    accept="image/*,.pdf"
                    className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-[hsl(var(--foreground))]"
                />
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="rounded-md border border-[hsl(var(--border))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90"
                >
                    Next
                </button>
            </div>
        </form>
    )
} 