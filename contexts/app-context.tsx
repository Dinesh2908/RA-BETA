"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type UserType = "tenant" | "landlord" | null

interface AppContextType {
  userType: UserType
  setUserType: (type: UserType) => void
  currentPage: string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null)
  const pathname = usePathname()

  // Get current page name from pathname
  const getCurrentPage = (path: string) => {
    if (path === '/') return 'home'
    if (path === '/about') return 'about'
    if (path === '/stories') return 'stories'
    if (path === '/values') return 'values'
    return 'home'
  }

  const currentPage = getCurrentPage(pathname)

  // Load user type from localStorage on mount
  useEffect(() => {
    const savedUserType = localStorage.getItem('rentaid-user-type') as UserType
    if (savedUserType) {
      setUserType(savedUserType)
    }
  }, [])

  // Save user type to localStorage when it changes
  useEffect(() => {
    if (userType) {
      localStorage.setItem('rentaid-user-type', userType)
    }
  }, [userType])

  return (
    <AppContext.Provider value={{ userType, setUserType, currentPage }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
