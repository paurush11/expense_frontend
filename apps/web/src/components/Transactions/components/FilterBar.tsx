import { useState } from 'react'
import { FilterModal } from './FilterModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

type Filter = {
    id: string
    label: string
}

const filters: Filter[] = [
    { id: 'all', label: 'All Transactions' },
    { id: 'income', label: 'Income' },
    { id: 'expense', label: 'Expense' },
    { id: 'transfer', label: 'Transfer' },
    { id: 'food', label: 'Food & Drinks' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'housing', label: 'Housing' },
    { id: 'transportation', label: 'Transportation' },
    { id: 'entertainment', label: 'Entertainment' }
]

export const FilterBar = () => {
    const [activeFilter, setActiveFilter] = useState('all')
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [appliedFilters, setAppliedFilters] = useState<any>(null)

    const handleApplyFilters = (filters: any) => {
        setAppliedFilters(filters)
        console.log('Applied filters:', filters)
    }

    return (
        <>
            <div className="relative bg-[hsl(var(--card))] rounded-2xl shadow-md p-6 w-[calc(100vw-38rem)]">
                {/* Main content wrapper with padding for the absolute button */}
                <div className="pr-[140px]">
                    {/* Scrollable filter buttons */}
                    <div className="flex overflow-x-auto no-scrollbar space-x-4 pb-4">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`flex-none px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeFilter === filter.id
                                    ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                                    : 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent))]/90'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Absolute positioned advanced filters button */}
                <div className="absolute right-6 top-1/2 -translate-y-3/4 ">
                    <button
                        onClick={() => setIsFilterModalOpen(true)}
                        className="flex items-center px-4 py-2 rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent))]/90 transition-colors"
                    >
                        <FontAwesomeIcon icon={faFilter} className="w-5 h-5 mr-2" />
                        Filters
                        {appliedFilters && (
                            <span className="ml-2 w-2 h-2 rounded-full bg-blue-500" />
                        )}
                    </button>
                </div>
            </div>

            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApplyFilters={handleApplyFilters}
            />
        </>
    )
} 