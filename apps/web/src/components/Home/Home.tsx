import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faChartLine, faCreditCard, faHistory } from '@fortawesome/free-solid-svg-icons'
import { useApp } from '../../providers/AppProvider'

export const Home = () => {
    const { user } = useApp()

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="rounded-lg shadow-md p-6 bg-[hsl(var(--card))]">
                <h2 className="text-2xl font-semibold mb-4 text-[hsl(var(--foreground))]">
                    Welcome back, {user?.name}!
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                    Track your expenses easily and efficiently. Start managing your finances today!
                </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">Total Balance</span>
                        <FontAwesomeIcon icon={faWallet} className="h-6 w-6" />
                    </div>
                    <p className="text-2xl font-bold mt-2">$2,450.50</p>
                </div>

                <div className="bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">Income</span>
                        <FontAwesomeIcon icon={faChartLine} className="h-6 w-6" />
                    </div>
                    <p className="text-2xl font-bold mt-2">$3,750.00</p>
                </div>

                <div className="bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">Expenses</span>
                        <FontAwesomeIcon icon={faCreditCard} className="h-6 w-6" />
                    </div>
                    <p className="text-2xl font-bold mt-2">$1,299.50</p>
                </div>

                <div className="bg-[hsl(var(--info))] text-[hsl(var(--info-foreground))] p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">Savings</span>
                        <FontAwesomeIcon icon={faWallet} className="h-6 w-6" />
                    </div>
                    <p className="text-2xl font-bold mt-2">$2,451.00</p>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-[hsl(var(--card))] rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))]">Recent Transactions</h3>
                    <FontAwesomeIcon icon={faHistory} className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
                </div>
                <div className="space-y-4">
                    {[
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
    )
} 