import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
    id: string
    name: string
    email: string
}

interface AppContextType {
    // Authentication
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    signup: (name: string, email: string, password: string) => Promise<void>
    logout: () => void

    // User
    user: User | null

    // Theme
    theme: 'theme-1' | 'theme-2'
    setTheme: (theme: 'theme-1' | 'theme-2') => void

    // UI State
    isLoading: boolean
    error: string | null
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    // Theme state
    const [theme, setTheme] = useState<'theme-1' | 'theme-2'>('theme-1')

    // UI state
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Authentication handlers
    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true)
            setError(null)

            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Simulate successful login
            setUser({
                id: '1',
                name: 'John Doe',
                email: email
            })
            setIsAuthenticated(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during login')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (name: string, email: string, password: string) => {
        try {
            setIsLoading(true)
            setError(null)

            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Simulate successful signup
            setUser({
                id: '1',
                name: name,
                email: email
            })
            setIsAuthenticated(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during signup')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        // TODO: Add any additional cleanup needed
    }

    const value = {
        // Authentication
        isAuthenticated,
        login,
        signup,
        logout,

        // User
        user,

        // Theme
        theme,
        setTheme,

        // UI State
        isLoading,
        error
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

// Custom hook to use the app context
export function useApp() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
} 