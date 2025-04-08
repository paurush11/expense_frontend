import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

interface ThemeToggleProps {
    onThemeChange: (theme: 'theme-1' | 'theme-2') => void
}

export const ThemeToggle = ({ onThemeChange }: ThemeToggleProps) => {
    const [isDark, setIsDark] = useState(false)

    const toggleTheme = () => {
        const newTheme = isDark ? 'theme-1' : 'theme-2'
        setIsDark(!isDark)
        onThemeChange(newTheme)
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted-foreground))] transition-colors"
            aria-label="Toggle theme"
        >
            <FontAwesomeIcon
                icon={isDark ? faSun : faMoon}
                className="h-5 w-5 text-[hsl(var(--foreground))]"
            />
        </button>
    )
} 