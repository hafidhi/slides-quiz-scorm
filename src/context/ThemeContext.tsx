// src/context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface ThemeContextType {
    isDark: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    isDark: true,
    toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme')
        return saved ? saved === 'dark' : true
    })

    // *** Tambahan: sinkronisasi kelas 'dark' di <html> ***
    useEffect(() => {
        const root = document.documentElement
        if (isDark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [isDark])

    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }, [isDark])

    const toggleTheme = () => setIsDark((prev) => !prev)

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
