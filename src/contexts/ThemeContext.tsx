import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light')
  const [isLoaded, setIsLoaded] = useState(false)

  // Get system preference
  const getSystemTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme)
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }
  }

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  }

  // Toggle between themes
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme') as Theme | null
        
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setTheme(savedTheme)
        } else {
          // Fall back to system preference
          const systemTheme = getSystemTheme()
          setTheme(systemTheme)
        }
      } catch (error) {
        console.error('Error initializing theme:', error)
        // Fall back to light theme
        setTheme('light')
      } finally {
        setIsLoaded(true)
      }
    }

    initializeTheme()

    // Listen for system theme changes
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        // Only change if user hasn't explicitly set a preference
        const savedTheme = localStorage.getItem('theme')
        if (!savedTheme) {
          setTheme(e.matches ? 'dark' : 'light')
        }
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  // Show loading state while theme is being initialized
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
