import { ReactNode } from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { useUser } from '../providers/UserProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faChartLine,
    faCreditCard,
    faGear,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavItem } from '../hooks/types'

interface MainLayoutProps {
    children: ReactNode
    onThemeChange: (theme: 'theme-1' | 'theme-2') => void
    theme: 'theme-1' | 'theme-2'
}


const navItems: NavItem[] = [
    { icon: faHome, path: '/', label: 'Home' },
    { icon: faChartLine, path: '/analytics', label: 'Analytics' },
    { icon: faCreditCard, path: '/transactions', label: 'Transactions' },
    { icon: faGear, path: '/settings', label: 'Settings' },
    { icon: faUser, path: '/profile', label: 'Profile' },
]

export const MainLayout = ({
    children,
    onThemeChange,
    theme,
}: MainLayoutProps) => {
    const { isAuthenticated } = useUser()
    const location = useLocation()
    const navigate = useNavigate()

    const isSelected = (path: string) => location.pathname === path

    return (
        <div className={`flex h-screen bg-[hsl(var(--background))] ${theme}`}>
            {isAuthenticated && (
                /* Fixed Sidebar Container */
                <div className="fixed left-4 top-0 h-screen flex items-center z-60 ">
                    {/* Sidebar with rounded corners */}
                    <div className="w-20 h-[85%] bg-[hsl(var(--card))] flex flex-col items-center py-8 space-y-8 rounded-[30px] shadow-lg border-4 border-[hsl(var(--border))] justify-center">

                        <nav className="flex flex-col items-center space-y-20 py-8 justify-between">
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200 ${isSelected(item.path)
                                        ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                                        : 'hover:bg-[hsl(var(--accent))] text-[hsl(var(--muted-foreground))]'
                                        }`}
                                    title={item.label}
                                >
                                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content Area with left padding to account for fixed sidebar */}
            <div className="flex-1 flex flex-col">
                <Navbar onThemeChange={onThemeChange} />
                <main className="flex-1 p-8 overflow-auto pl-28 z-50 mt-20">
                    {children}
                </main>
            </div>
        </div>
    )
} 