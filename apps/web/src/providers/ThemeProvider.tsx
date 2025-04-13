import { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'theme-1' | 'theme-2'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('theme-1')

    const toggleTheme = () => {
        setTheme(prev => prev === 'theme-1' ? 'theme-2' : 'theme-1')
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
} 