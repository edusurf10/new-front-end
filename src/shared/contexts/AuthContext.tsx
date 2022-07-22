import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { AuthService, IAuth } from '../services/api/auth/AuthService'

interface IAuthContextData {
  login: (email: string, password: string) => Promise<string | void>
  logout: () => Promise<string | void>
  isAuthenticated: boolean
}

interface IAuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext({} as IAuthContextData)

const LOCAL_STORAGE_USER_DATA = 'QWERTY'

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<IAuth>()

  useEffect(() => {
    const user = localStorage.getItem(LOCAL_STORAGE_USER_DATA)
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth({email, password})
    if (result instanceof Error) {
      return result.message
    } else {
      localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(result))
      setUser(result)
    }
  }, [])

  const handleLogout = useCallback(async () => {
    const result = await AuthService.logout()
    if (result instanceof Error) {
      return result.message
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_DATA)
      setUser(undefined)
    }
  }, [])

  const isAuthenticated = useMemo(() => !!user, [user])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
