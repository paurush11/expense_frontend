import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faCreditCard, faHome, faBus, faUtensils } from '@fortawesome/free-solid-svg-icons'

type Transaction = {
    id: string
    title: string
    amount: number
    date: string
    category: 'shopping' | 'transfer' | 'housing' | 'transport' | 'food'
    type: 'expense' | 'income'
}

const categoryIcons = {
    shopping: faShoppingCart,
    transfer: faCreditCard,
    housing: faHome,
    transport: faBus,
    food: faUtensils,
}

const transactions: Transaction[] = [
    { id: '1', title: 'Grocery Shopping', amount: -82.50, date: '2024-03-15', category: 'shopping', type: 'expense' },
    { id: '2', title: 'Rent Payment', amount: -1200.00, date: '2024-03-01', category: 'housing', type: 'expense' },
    { id: '3', title: 'Bus Ticket', amount: -2.50, date: '2024-03-10', category: 'transport', type: 'expense' },
    { id: '4', title: 'Restaurant', amount: -45.00, date: '2024-03-12', category: 'food', type: 'expense' },
    { id: '5', title: 'Bank Transfer', amount: 2500.00, date: '2024-03-01', category: 'transfer', type: 'income' },
]

export const TransactionActivity = () => {
    return (
        <div className="bg-[hsl(var(--card))] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={categoryIcons[transaction.category]}
                                    className="text-[hsl(var(--primary-foreground))]"
                                />
                            </div>
                            <div>
                                <h4 className="font-medium text-[hsl(var(--foreground))]">
                                    {transaction.title}
                                </h4>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                    {transaction.date}
                                </p>
                            </div>
                        </div>
                        <span className={`font-semibold ${transaction.type === 'income'
                            ? 'text-[hsl(var(--success))]'
                            : 'text-[hsl(var(--destructive))]'
                            }`}>
                            {transaction.type === 'income' ? '+' : '-'}
                            ${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
} 