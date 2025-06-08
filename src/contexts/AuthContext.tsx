import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { User, AuthState, LoginCredentials, RegisterData } from '../types/auth'
import toast from 'react-hot-toast'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: User }
  | { type: 'CLEAR_ERROR' }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      }
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: action.payload
      }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@stockms.com',
    name: 'Admin User',
    role: 'Admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2024-01-01',
    lastLogin: new Date().toISOString()
  },
  {
    id: '2',
    email: 'assistant@stockms.com',
    name: 'Assistant User',
    role: 'Assistant',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2024-01-01',
    lastLogin: new Date().toISOString()
  },
  {
    id: '3',
    email: 'cashier@stockms.com',
    name: 'Cashier User',
    role: 'Cashier',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    createdAt: '2024-01-01',
    lastLogin: new Date().toISOString()
  }
]

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    // Check for stored auth data on app load
    const storedUser = localStorage.getItem('stockms_user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      } catch (error) {
        localStorage.removeItem('stockms_user')
      }
    }
  }, [])

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' })
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const user = mockUsers.find(u => u.email === credentials.email)
      
      if (!user || credentials.password !== 'password123') {
        throw new Error('Invalid email or password')
      }

      const updatedUser = { ...user, lastLogin: new Date().toISOString() }
      localStorage.setItem('stockms_user', JSON.stringify(updatedUser))
      dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUser })
      toast.success(`Welcome back, ${user.name}!`)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed'
      dispatch({ type: 'LOGIN_FAILURE', payload: message })
      toast.error(message)
    }
  }

  const register = async (data: RegisterData) => {
    dispatch({ type: 'LOGIN_START' })
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const existingUser = mockUsers.find(u => u.email === data.email)
      if (existingUser) {
        throw new Error('User with this email already exists')
      }

      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: data.role,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }

      mockUsers.push(newUser)
      localStorage.setItem('stockms_user', JSON.stringify(newUser))
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser })
      toast.success('Account created successfully!')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed'
      dispatch({ type: 'LOGIN_FAILURE', payload: message })
      toast.error(message)
    }
  }

  const logout = () => {
    localStorage.removeItem('stockms_user')
    dispatch({ type: 'LOGOUT' })
    toast.success('Logged out successfully')
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!state.user) return
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const updatedUser = { ...state.user, ...data }
      localStorage.setItem('stockms_user', JSON.stringify(updatedUser))
      dispatch({ type: 'UPDATE_PROFILE', payload: updatedUser })
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}