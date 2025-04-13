import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCar, faPlane, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

type Goal = {
    id: string
    title: string
    targetAmount: number
    currentAmount: number
    icon: typeof faHome
    dueDate: string
}

const goals: Goal[] = [
    {
        id: '1',
        title: 'House Down Payment',
        targetAmount: 50000,
        currentAmount: 35000,
        icon: faHome,
        dueDate: 'Dec 2024'
    },
    {
        id: '2',
        title: 'New Car',
        targetAmount: 25000,
        currentAmount: 15000,
        icon: faCar,
        dueDate: 'Jun 2024'
    },
    {
        id: '3',
        title: 'Vacation Fund',
        targetAmount: 5000,
        currentAmount: 3500,
        icon: faPlane,
        dueDate: 'Aug 2024'
    },
    {
        id: '4',
        title: 'Education',
        targetAmount: 20000,
        currentAmount: 8000,
        icon: faGraduationCap,
        dueDate: 'Sep 2024'
    }
]

export const MyGoals = () => {
    return (
        <div className="bg-[hsl(var(--card))] rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-6">My Goals</h2>
            <div className="space-y-6">
                {goals.map((goal) => {
                    const progress = (goal.currentAmount / goal.targetAmount) * 100

                    return (
                        <div key={goal.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="h-8 w-8 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={goal.icon}
                                            className="text-[hsl(var(--primary-foreground))]"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-[hsl(var(--foreground))]">
                                            {goal.title}
                                        </h4>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                            Due {goal.dueDate}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">
                                        ${goal.currentAmount.toLocaleString()}
                                        <span className="text-[hsl(var(--muted-foreground))]">
                                            /${goal.targetAmount.toLocaleString()}
                                        </span>
                                    </p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                        {progress.toFixed(0)}% Complete
                                    </p>
                                </div>
                            </div>
                            <div className="h-2 bg-[hsl(var(--accent))] rounded-full">
                                <div
                                    className="h-full bg-[hsl(var(--primary))] rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
} 