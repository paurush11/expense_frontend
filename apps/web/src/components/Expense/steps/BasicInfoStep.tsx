import { ExpenseFormData } from '../../../types/expense'

interface BasicInfoStepProps {
    onNext: (data: Partial<ExpenseFormData>) => void
    initialData?: Partial<ExpenseFormData>
}

export const BasicInfoStep = ({ onNext, initialData }: BasicInfoStepProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = {
            title: formData.get('title') as string,
            amount: parseFloat(formData.get('amount') as string),
            date: formData.get('date') as string,
            category: formData.get('category') as string,
            description: formData.get('description') as string,
        }
        onNext(data)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    defaultValue={initialData?.title}
                    className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-[hsl(var(--foreground))]"
                />
            </div>
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                    Amount
                </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    required
                    min="0"
                    step="0.01"
                    defaultValue={initialData?.amount}
                    className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-[hsl(var(--foreground))]"
                />
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                    Date
                </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    defaultValue={initialData?.date}
                    className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-[hsl(var(--foreground))]"
                />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    required
                    defaultValue={initialData?.category}
                    className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-[hsl(var(--foreground))]"
                >
                    <option value="">Select a category</option>
                    <option value="food">Food</option>
                    <option value="transportation">Transportation</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="utilities">Utilities</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    defaultValue={initialData?.description}
                    className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-[hsl(var(--foreground))]"
                />
            </div>
            <div className="flex justify-end">
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