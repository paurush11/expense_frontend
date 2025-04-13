import { ReactNode } from 'react'
import { ThemeProvider } from './ThemeProvider'
import { UserProvider } from './UserProvider'

export function AppProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </ThemeProvider>
    )
}

// Re-export hooks for convenience
export { useTheme } from './ThemeProvider'
export { useUser } from './UserProvider' 