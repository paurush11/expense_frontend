import { ExpenseFormData } from '../../../types/expense'

interface SplitTypeStepProps {
    onNext: (data: Partial<ExpenseFormData>) => void
    onBack: () => void
    initialData?: Partial<ExpenseFormData>
}

export const SplitTypeStep = ({ onNext, onBack, initialData }: SplitTypeStepProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = {
            splitType: formData.get('splitType') as 'equal' | 'percentage' | 'amount'
        }
        onNext(data)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))]">
                    How would you like to split this expense?
                </label>
                <div className="mt-2 space-y-2">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="splitType"
                            value="equal"
                            defaultChecked={initialData?.splitType === 'equal'}
                            className="h-4 w-4 border-[hsl(var(--border))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                        />
                        <span className="text-sm text-[hsl(var(--foreground))]">Equal split</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="splitType"
                            value="percentage"
                            defaultChecked={initialData?.splitType === 'percentage'}
                            className="h-4 w-4 border-[hsl(var(--border))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                        />
                        <span className="text-sm text-[hsl(var(--foreground))]">Percentage split</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="splitType"
                            value="amount"
                            defaultChecked={initialData?.splitType === 'amount'}
                            className="h-4 w-4 border-[hsl(var(--border))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))]"
                        />
                        <span className="text-sm text-[hsl(var(--foreground))]">Exact amount split</span>
                    </label>
                </div>
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