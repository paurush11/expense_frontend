import { FilterBar } from './components/FilterBar'
import { TransactionDashboardChart } from './components/TransactionDashboardChart'
import { TransactionActivity } from './components/TransactionActivity'
import { QuickSightComponents } from './components/QuickSightComponents'
import { MyGoals } from './components/MyGoals'

export const TransactionsPage = () => {
    return (
        <div className="relative w-full h-full">
            <div className="w-full space-y-6">
                <div className="flex gap-6">
                    {/* Left Section - 60% */}
                    <div className="w-[calc(100vw-38rem)] space-y-6">
                        {/* Filter Bar */}
                        <FilterBar />
                        {/* Transaction Dashboard Chart */}
                        <TransactionDashboardChart />
                        {/* Transaction Activity */}
                        <TransactionActivity />
                    </div>

                    {/* Right Section - 30% */}
                    <div className="w-[calc(26rem)]">
                        {/* Quick Insights */}
                        <QuickSightComponents />
                        {/* My Goals */}
                        <MyGoals />
                    </div>
                </div>
            </div>
        </div>
    )
} 