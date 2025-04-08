import { ReactNode } from 'react'
import { Navbar } from '../components/Navbar/Navbar'

interface MainLayoutProps {
    children: ReactNode
    onThemeChange: (theme: 'theme-1' | 'theme-2') => void
    isAuthenticated?: boolean
    onLogin?: () => void
    onSignup?: () => void
    onLogout?: () => void
    theme: 'theme-1' | 'theme-2'
}

export const MainLayout = ({
    children,
    onThemeChange,
    isAuthenticated,
    onLogin,
    onSignup,
    onLogout,
    theme,
}: MainLayoutProps) => {
    return (
        <div className={`min-h-screen bg-[hsl(var(--background))] ${theme}`}>
            <Navbar
                onThemeChange={onThemeChange}
                isAuthenticated={isAuthenticated}
                onLogin={onLogin}
                onSignup={onSignup}
                onLogout={onLogout}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    )
} 