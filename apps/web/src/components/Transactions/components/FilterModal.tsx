import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCalendar } from '@fortawesome/free-solid-svg-icons'

interface FilterModalProps {
    isOpen: boolean
    onClose: () => void
    onApplyFilters: (filters: FilterState) => void
}

type TimePeriod = 'all' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom'
type ExpenseType = 'all' | 'individual' | 'group' | 'recurring'
type TransactionStatus = 'all' | 'pending' | 'completed' | 'failed'

interface FilterState {
    startDate: string
    endDate: string
    timePeriod: TimePeriod
    expenseType: ExpenseType
    transactionStatus: TransactionStatus
    minAmount: string
    maxAmount: string
    categories: string[]
}

const categories = [
    'Food & Drinks',
    'Shopping',
    'Housing',
    'Transportation',
    'Entertainment',
    'Healthcare',
    'Education',
    'Utilities',
    'Travel',
    'Others'
]

export const FilterModal = ({ isOpen, onClose, onApplyFilters }: FilterModalProps) => {
    const [filters, setFilters] = useState<FilterState>({
        startDate: '',
        endDate: '',
        timePeriod: 'all',
        expenseType: 'all',
        transactionStatus: 'all',
        minAmount: '',
        maxAmount: '',
        categories: []
    })

    const handleCategoryToggle = (category: string) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }))
    }

    const handleApply = () => {
        onApplyFilters(filters)
        onClose()
    }

    const handleReset = () => {
        setFilters({
            startDate: '',
            endDate: '',
            timePeriod: 'all',
            expenseType: 'all',
            transactionStatus: 'all',
            minAmount: '',
            maxAmount: '',
            categories: []
        })
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 overflow-y-auto">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" onClick={onClose} />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="relative mx-auto max-w-3xl w-full rounded-2xl bg-white p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Filter Transactions</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Date Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <FontAwesomeIcon icon={faCalendar} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="date"
                                        value={filters.startDate}
                                        onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faCalendar} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="date"
                                        value={filters.endDate}
                                        onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Time Period */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                {['all', 'daily', 'weekly', 'monthly', 'yearly', 'custom'].map((period) => (
                                    <button
                                        key={period}
                                        onClick={() => setFilters(prev => ({ ...prev, timePeriod: period as TimePeriod }))}
                                        className={`px-4 py-2 rounded-full text-sm capitalize ${filters.timePeriod === period
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Expense Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expense Type</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {['all', 'individual', 'group', 'recurring'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setFilters(prev => ({ ...prev, expenseType: type as ExpenseType }))}
                                        className={`px-4 py-2 rounded-full text-sm capitalize ${filters.expenseType === type
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Transaction Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Status</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {['all', 'pending', 'completed', 'failed'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilters(prev => ({ ...prev, transactionStatus: status as TransactionStatus }))}
                                        className={`px-4 py-2 rounded-full text-sm capitalize ${filters.transactionStatus === status
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Amount Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Min Amount"
                                        value={filters.minAmount}
                                        onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Max Amount"
                                        value={filters.maxAmount}
                                        onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryToggle(category)}
                                        className={`px-4 py-2 rounded-full text-sm ${filters.categories.includes(category)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            Reset
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleApply}
                            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 