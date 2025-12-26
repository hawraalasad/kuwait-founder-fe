import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const [userRes, adminRes] = await Promise.all([
        fetch('/api/auth/check', { credentials: 'include' }),
        fetch('/api/admin/check', { credentials: 'include' })
      ])

      const userData = await userRes.json()
      const adminData = await adminRes.json()

      setIsAuthenticated(userData.authenticated || false)
      setIsAdmin(adminData.isAdmin || false)
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (password) => {
    try {
      const res = await fetch('/api/auth/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password })
      })

      const data = await res.json()

      if (data.success) {
        setIsAuthenticated(true)
        return { success: true }
      }

      return { success: false, error: data.error }
    } catch (error) {
      return { success: false, error: 'Connection error. Please try again.' }
    }
  }

  const adminLogin = async (password) => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password })
      })

      const data = await res.json()

      if (data.success) {
        setIsAdmin(true)
        return { success: true }
      }

      return { success: false, error: data.error }
    } catch (error) {
      return { success: false, error: 'Connection error. Please try again.' }
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const adminLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      })
      setIsAdmin(false)
    } catch (error) {
      console.error('Admin logout error:', error)
    }
  }

  const value = {
    isAuthenticated,
    isAdmin,
    loading,
    login,
    adminLogin,
    logout,
    adminLogout,
    checkAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
