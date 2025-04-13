import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons'

interface InsightCardProps {
    title: string
    value: string
    icon: IconDefinition
    iconBgColor: string
    iconColor: string
    trend?: {
        value: string
        isPositive: boolean
        label: string
    }
    subtitle?: string
}

export const InsightCard = ({
    title,
    value,
    icon,
    iconBgColor,
    iconColor,
    trend,
    subtitle
}: InsightCardProps) => {
    return (
        <div className="p-4 rounded-lg space-y-4 bg-[hsl(var(--card))] shadow-black/10">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{title}</p>
                    <p className="text-2xl text-[hsl(var(--muted-foreground))] font-semibold">{value}</p>
                </div>
                <div className={`h-10 w-10 rounded-full ${iconBgColor} flex items-center justify-center`}>
                    <FontAwesomeIcon icon={icon} className={iconColor} />
                </div>
            </div>

            {trend && (
                <div className={`flex items-center space-x-2 ${trend.isPositive ? 'text-[hsl(var(--success))]' : 'text-[hsl(var(--destructive))]'}`}>
                    <FontAwesomeIcon icon={trend.isPositive ? faArrowTrendUp : faArrowTrendDown} />
                    <span className="text-sm">{trend.value} {trend.label}</span>
                </div>
            )}

            {subtitle && (
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{subtitle}</p>
            )}
        </div>
    )
} 