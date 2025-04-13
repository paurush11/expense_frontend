export interface ExpenseFormData {
    title: string
    amount: number
    date: string
    category: string
    description?: string
    splitType: 'equal' | 'percentage' | 'amount'
    participants: {
        id: string
        name: string
        amount?: number
        percentage?: number
    }[]
    paymentMethod: string
    receipt?: File
} 