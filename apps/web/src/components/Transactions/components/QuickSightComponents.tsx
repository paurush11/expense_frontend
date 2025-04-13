import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowTrendUp,
    faArrowTrendDown,
    faWallet,
    faChartLine,
    faBars
} from '@fortawesome/free-solid-svg-icons'
import { InsightCard } from './InsightCard'

const insights = [
    {
        title: 'Monthly Spending',
        value: '$2,450.50',
        icon: faWallet,
        iconBgColor: 'bg-[hsl(var(--primary))]',
        iconColor: 'text-[hsl(var(--primary-foreground))]',
        trend: {
            value: '12%',
            isPositive: true,
            label: 'from last month'
        }
    },
    {
        title: 'Biggest Expense',
        value: '$850.00',
        icon: faArrowTrendDown,
        iconBgColor: 'bg-[hsl(var(--destructive))]',
        iconColor: 'text-[hsl(var(--destructive-foreground))]',
        subtitle: 'Housing & Rent'
    },
    {
        title: 'Savings Rate',
        value: '25%',
        icon: faChartLine,
        iconBgColor: 'bg-[hsl(var(--success))]',
        iconColor: 'text-[hsl(var(--success-foreground))]',
        trend: {
            value: '5%',
            isPositive: true,
            label: 'increase'
        }
    },
    {
        title: 'Savings Rate',
        value: '25%',
        icon: faChartLine,
        iconBgColor: 'bg-[hsl(var(--success))]',
        iconColor: 'text-[hsl(var(--success-foreground))]',
        trend: {
            value: '5%',
            isPositive: true,
            label: 'increase'
        }
    }
]

export const QuickSightComponents = () => {
    return (
        <div className="space-y-4  rounded-2xl shadow-md p-6 w-[calc(26rem)] shadow-black/10 max-h-[33rem] overflow-y-auto no-scrollbar">
            <h2 className="text-xl font-semibold mb-6 text-[hsl(var(--foreground))] bg-[hsl(var(--card))] p-4 rounded-lg">Quick Insights</h2>
            <div className="flex justify-between items-center">
                <div className="flex space-x-4 items-center">
                    <button className="text-sm text-[hsl(var(--card))] bg-[hsl(var(--success))] p-2 rounded-lg">New Transaction</button>
                    <button className="text-sm text-[hsl(var(--card))] bg-[hsl(var(--success))] p-2 rounded-lg">Generate Report</button>
                </div>
                <div className="flex space-x-4 items-center">
                    <button className="text-sm text-black bg-white p-2 rounded-lg">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {insights.map((insight, index) => (
                    <InsightCard
                        key={index}
                        {...insight}
                    />
                ))}
            </div>
        </div>
    )
} 