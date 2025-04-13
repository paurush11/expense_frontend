import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../../providers/UserProvider'
import { useState } from 'react'
import { ExpenseForm } from '../Expense/ExpenseForm'
import { CreditCard } from '../CreditCard/CreditCard'

type CardVariant = 'golden' | 'silver' | 'blue' | 'black'

interface Card {
    cardNumber: string
    expiryDate: string
    holderName: string
    variant: CardVariant
    cvv: string
}

const cards: Card[] = [
    {
        cardNumber: "2781819166713190",
        expiryDate: "09/25",
        holderName: "John Doe",
        variant: "golden",
        cvv: "123"
    },
    {
        cardNumber: "0192182711810182",
        expiryDate: "10/24",
        holderName: "John Doe",
        variant: "silver",
        cvv: "456"
    },
    {
        cardNumber: "1019991011290191",
        expiryDate: "11/26",
        holderName: "John Doe",
        variant: "blue",
        cvv: "789"
    },
    {
        cardNumber: "4456789012345678",
        expiryDate: "12/25",
        holderName: "John Doe",
        variant: "black",
        cvv: "012"
    }
]

export const Home = () => {
    const { user } = useUser()
    const [showExpenseForm, setShowExpenseForm] = useState(false)

    return (
        <div className="space-y-6 w-[calc(100vw-9rem)]">
            {/* Recent Transactions */}
            <div className="flex gap-6 justify-between">
                <div className="w-[calc(100vw-38rem)]">
                    <div className="flex overflow-x-auto pb-6 space-x-8 no-scrollbar">
                        {cards.map((card, index) => (
                            <div key={index} className="flex-none">
                                <CreditCard
                                    cardNumber={card.cardNumber}
                                    expiryDate={card.expiryDate}
                                    holderName={card.holderName}
                                    variant={card.variant}
                                    cvv={card.cvv}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-[calc(26rem)]">
                    <div className="bg-[hsl(var(--card))] rounded-lg shadow-md p-6 w-[calc(26rem)]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))]">Recent Transactions</h3>
                            <FontAwesomeIcon icon={faHistory} className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: 'Grocery Shopping', amount: -82.50, date: '2024-03-15', type: 'expense' },
                                { title: 'Salary Deposit', amount: 3750.00, date: '2024-03-01', type: 'income' },
                                { title: 'Internet Bill', amount: -59.99, date: '2024-03-10', type: 'expense' },
                                { title: 'Grocery Shopping', amount: -82.50, date: '2024-03-15', type: 'expense' },
                                { title: 'Salary Deposit', amount: 3750.00, date: '2024-03-01', type: 'income' },
                                { title: 'Internet Bill', amount: -59.99, date: '2024-03-10', type: 'expense' },
                                { title: 'Grocery Shopping', amount: -82.50, date: '2024-03-15', type: 'expense' },
                                { title: 'Salary Deposit', amount: 3750.00, date: '2024-03-01', type: 'income' },
                                { title: 'Internet Bill', amount: -59.99, date: '2024-03-10', type: 'expense' },
                            ].map((transaction, index) => (
                                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-[hsl(var(--surface))]">
                                    <div>
                                        <h4 className="font-medium text-[hsl(var(--foreground))]">{transaction.title}</h4>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">{transaction.date}</p>
                                    </div>
                                    <span className={`font-semibold ${transaction.type === 'income'
                                        ? 'text-[hsl(var(--success))]'
                                        : 'text-[hsl(var(--destructive))]'
                                        }`}>
                                        {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Expense Form Modal */}
            {showExpenseForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[hsl(var(--card))] rounded-lg p-6 max-w-2xl w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Add New Expense</h2>
                            <button
                                onClick={() => setShowExpenseForm(false)}
                                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                            >
                                ×
                            </button>
                        </div>
                        <ExpenseForm onClose={() => setShowExpenseForm(false)} />
                    </div>
                </div>
            )}
        </div>
    )
} 