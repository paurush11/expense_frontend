import { ExpenseFormData } from '../../../types/expense'

interface ReviewStepProps {
    onNext: (data: Partial<ExpenseFormData>) => void
    onBack: () => void
    initialData?: Partial<ExpenseFormData>
}

export const ReviewStep = ({ onNext, onBack, initialData }: ReviewStepProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onNext({})
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-[hsl(var(--foreground))]">Expense Details</h4>
                <div className="rounded-md border border-[hsl(var(--border))] p-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">Title:</span>
                            <span className="text-sm text-[hsl(var(--foreground))]">{initialData?.title}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">Amount:</span>
                            <span className="text-sm text-[hsl(var(--foreground))]">${initialData?.amount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">Date:</span>
                            <span className="text-sm text-[hsl(var(--foreground))]">{initialData?.date}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">Category:</span>
                            <span className="text-sm text-[hsl(var(--foreground))]">{initialData?.category}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">Split Type:</span>
                            <span className="text-sm text-[hsl(var(--foreground))]">{initialData?.splitType}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">Payment Method:</span>
                            <span className="text-sm text-[hsl(var(--foreground))]">{initialData?.paymentMethod}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-[hsl(var(--foreground))]">Participants</h4>
                <div className="rounded-md border border-[hsl(var(--border))] p-4">
                    <div className="space-y-2">
                        {initialData?.participants?.map(participant => (
                            <div key={participant.id} className="flex justify-between">
                                <span className="text-sm text-[hsl(var(--muted-foreground))]">{participant.name}</span>
                                <span className="text-sm text-[hsl(var(--foreground))]">
                                    {initialData.splitType === 'equal' && 'Equal share'}
                                    {initialData.splitType === 'percentage' && `${participant.percentage}%`}
                                    {initialData.splitType === 'amount' && `$${participant.amount}`}
                                </span>
                            </div>
                        ))}
                    </div>
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
                    Submit
                </button>
            </div>
        </form>
    )
} 