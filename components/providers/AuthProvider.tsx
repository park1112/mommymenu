'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  pregnancyWeek?: number
  pregnancyDay?: number
  dueDate?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock authentication check
    const checkAuth = async () => {
      try {
        // Simulate checking for existing session
        const mockUser: User = {
          id: '1',
          name: '김임산',
          email: 'pregnant@example.com',
          pregnancyWeek: 23,
          pregnancyDay: 3,
          dueDate: '2024-12-25'
        }
        setUser(mockUser)
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock login logic
      const mockUser: User = {
        id: '1',
        name: '김임산',
        email,
        pregnancyWeek: 23,
        pregnancyDay: 3,
        dueDate: '2024-12-25'
      }
      setUser(mockUser)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = !!user

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}