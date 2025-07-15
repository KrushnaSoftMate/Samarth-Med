"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin" | "manager"
}

interface AdminContextType {
  user: AdminUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null)

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - replace with real API call
    if (email === "admin@rotemed.com" && password === "admin123") {
      setUser({
        id: "1",
        email: "admin@rotemed.com",
        name: "Admin User",
        role: "admin",
      })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AdminContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider")
  }
  return context
}
