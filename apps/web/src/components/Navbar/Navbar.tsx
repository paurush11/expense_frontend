import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { ThemeToggle } from './ThemeToggle'

interface NavbarProps {
    onThemeChange: (theme: 'theme-1' | 'theme-2') => void
    isAuthenticated?: boolean
    onLogin?: () => void
    onSignup?: () => void
    onLogout?: () => void
}

export const Navbar = ({
    onThemeChange,
    isAuthenticated = false,
    onLogin,
    onSignup,
    onLogout,
}: NavbarProps) => {
    return (
        <nav className="bg-[hsl(var(--background))] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side - Logo/Name */}
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">
                            Expense Manager
                        </h1>
                    </div>

                    {/* Right side - Theme Toggle & Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle onThemeChange={onThemeChange} />

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <button
                                    className="flex items-center space-x-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                    onClick={onLogout}
                                >
                                    <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <button
                                    className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                                    onClick={onLogin}
                                >
                                    Login
                                </button>
                                <button
                                    className="bg-[hsl(var(--primary))] hover:opacity-90 text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-lg transition-colors"
                                    onClick={onSignup}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
} 