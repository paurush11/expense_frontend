import { ReactNode } from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { useUser } from '../providers/UserProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faChartLine,
    faCreditCard,
    faMoneyBillTransfer,
    faUser,
    faChartBar
} from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavItem } from '../hooks/types'
import { TooltipProvider } from '../providers/TooltipProvider'
import { Tooltip } from '../providers/TooltipProvider'
import { TooltipContent } from '../providers/TooltipProvider'
import { TooltipTrigger } from '../providers/TooltipProvider'
import { useGlobalUIState } from '../providers/GlobalUserInterfaceProvider'

interface MainLayoutProps {
    children: ReactNode
    onThemeChange: (theme: 'theme-1' | 'theme-2') => void
    theme: 'theme-1' | 'theme-2'
}


const navItems: NavItem[] = [
    { icon: faHome, path: '/', label: 'Home' },
    { icon: faChartLine, path: '/analytics', label: 'Analytics' },
    { icon: faCreditCard, path: '/transactions', label: 'Transactions' },
    { icon: faChartBar, path: '/future', label: 'Future' },
    { icon: faUser, path: '/profile', label: 'Profile' },
    { icon: faMoneyBillTransfer, path: '/tax', label: 'Tax' },
]

export const MainLayout = ({
    children,
    onThemeChange,
    theme,
}: MainLayoutProps) => {
    const { isAuthenticated } = useUser()
    const location = useLocation()
    const navigate = useNavigate()
    const { isModalOpen } = useGlobalUIState()
    const isSelected = (path: string) => location.pathname === path

    return (
        <div className={`h-screen bg-[hsl(var(--background))] ${theme} min-w-screen relative`}>
            {/* Main Content Area */}
            <div className="flex flex-col h-full">
                <Navbar onThemeChange={onThemeChange} />
                <main className="flex-1 p-8 overflow-auto pl-28 mt-20">
                    {children}
                </main>
            </div>

            {/* Sidebar - Placed after main content to ensure it's on top */}
            {isAuthenticated && (
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 h-[85%] pointer-events-none ${isModalOpen ? 'blur-lg  bg-[hsl(var(--background))]' : ''}`}>
                    <div className="w-20 h-full bg-[hsl(var(--card))] flex flex-col items-center py-8 space-y-8 rounded-[30px] shadow-lg border-4 border-[hsl(var(--border))] justify-center pointer-events-auto">
                        <nav className="flex flex-col items-center space-y-2 flex-1 py-8 justify-between">
                            {navItems.map((item) => (
                                <TooltipProvider key={item.path}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div
                                                onClick={() => navigate(item.path)}
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200 cursor-pointer ${isSelected(item.path)
                                                    ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                                                    : 'hover:bg-[hsl(var(--accent))] text-[hsl(var(--muted-foreground))]'
                                                    }`}
                                                title={item.label}
                                            >
                                                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {item.label}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </div>
    )
} 