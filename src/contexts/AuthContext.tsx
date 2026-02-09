import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/api'
import { useToast } from '@/hooks/use-toast'
import { logger } from '@/utils/logger'
import { setSecureToken, getSecureToken, clearSecureToken } from '@/utils/security'

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  isLoading: boolean
}

interface RegisterData {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const savedToken = getSecureToken()
    logger.log('🔍 Initial token check:', savedToken ? 'found' : 'not found')
    
    if (savedToken && savedToken !== 'undefined' && savedToken !== 'null') {
      setToken(savedToken)
      fetchUser()
    } else {
      logger.log('🚫 No valid token found, setting loading to false')
      setIsLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    const currentToken = getSecureToken()
    
    // Safety guard: don't call API without valid token
    if (!currentToken || currentToken === 'undefined' || currentToken === 'null') {
      logger.log('🚫 No valid token for fetchUser, clearing state')
      clearSecureToken()
      setToken(null)
      setIsLoading(false)
      return
    }
    
    try {
      logger.log('👤 Fetching user data with token')
      const response = await api.get('/auth/me')
      setUser(response.data.user)
      logger.log('✅ User data loaded successfully')
    } catch (error: any) {
      logger.error('❌ Failed to fetch user:', error)
      
      // Only handle non-401 errors here (401 is handled by API interceptor)
      if (error.response?.status !== 401) {
        clearSecureToken()
        setToken(null)
        toast({
          title: "Xatolik",
          description: "Foydalanuvchi ma'lumotlarini yuklashda xatolik yuz berdi",
          variant: "destructive",
        })
      }
      // For 401 errors, let API interceptor handle redirect
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      logger.log('🔐 Attempting login with:', { email, password: '***' })
      const response = await api.post('/auth/login', { email, password })
      
      // DEBUG: Log response to inspect token structure
      logger.log('📥 Login response:', response)
      logger.log('📥 Response data:', response.data)
      
      // Handle different response structures - ONLY use accessToken
      let accessToken = response.data?.accessToken
      
      // Validate token exists and is not undefined
      if (!accessToken || accessToken === 'undefined' || accessToken === 'null') {
        logger.error('❌ No valid accessToken found in response:', response.data)
        throw new Error('Login response missing valid access token')
      }
      
      logger.log('✅ Extracted accessToken:', accessToken)
      setToken(accessToken)
      setSecureToken(accessToken)
      logger.log('💾 Token saved securely')
      
      await fetchUser()
      logger.log('👤 User data fetched successfully')
    } catch (error) {
      logger.error('❌ Login error:', error)
      throw error
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      logger.log('🔐 Attempting registration:', userData)
      logger.log('📧 User email:', userData.email)
      console.log('🔐 Attempting registration:', userData)
      console.log('📧 User email:', userData.email)
      
      const response = await api.post('/auth/register', userData)
      
      // DEBUG: Comprehensive response logging
      console.log('📥 Full register response:', response)
      console.log('📥 Response status:', response.status)
      console.log('📥 Response data:', JSON.stringify(response.data, null, 2))
      
      const responseData = response.data
      
      // Handle 409 Conflict - user exists, show login message (NO redirect)
      if (response.status === 409) {
        console.log('⚠️ 409 Conflict: User already exists - NO OTP redirect')
        const errorMessage = responseData?.message || 'Email already registered. Please login.'
        throw new Error(errorMessage)
      }
      
      // Handle 200 Success - check for OTP redirect
      if (response.status === 200 || responseData?.status === 200) {
        console.log('✅ 200 Success response received')
        
        // Strict: if response.next exists, redirect to OTP
        if (responseData?.next) {
          console.log('🔍 Found next field:', responseData.next)
          console.log('✅ OTP REDIRECT TRIGGERED: next field exists')
          
          const emailToStore = responseData.email || userData.email
          console.log('💾 Storing pending_email:', emailToStore)
          localStorage.setItem('pending_email', emailToStore)
          
          console.log('🔄 Redirecting to OTP page')
          window.location.href = 'otp.html'
          return responseData
        }
        
        // Check for need_otp: true
        if (responseData?.need_otp === true) {
          console.log('✅ OTP REDIRECT TRIGGERED: need_otp === true')
          console.log('💾 Storing pending_email:', userData.email)
          localStorage.setItem('pending_email', userData.email)
          console.log('🔄 Redirecting to OTP page')
          window.location.href = 'otp.html'
          return responseData
        }
        
        // Check for message containing verification/otp
        if (responseData?.message) {
          const message = responseData.message.toLowerCase()
          if (message.includes('verification') || message.includes('otp')) {
            console.log('✅ OTP REDIRECT TRIGGERED: message contains verification/otp')
            console.log('💾 Storing pending_email:', userData.email)
            localStorage.setItem('pending_email', userData.email)
            console.log('🔄 Redirecting to OTP page')
            window.location.href = 'otp.html'
            return responseData
          }
        }
        
        // If response contains a token (direct login)
        let accessToken = responseData?.accessToken || responseData?.token
        if (accessToken) {
          console.log('✅ DIRECT LOGIN TRIGGERED: token found')
          console.log('💾 Storing accessToken:', accessToken)
          setToken(accessToken)
          localStorage.setItem('accessToken', accessToken)
          await fetchUser()
          return responseData
        }
        
        // Default: assume OTP needed for safety
        console.log('⚠️ DEFAULT OTP REDIRECT: no conditions met, redirecting anyway')
        console.log('💾 Storing pending_email:', userData.email)
        localStorage.setItem('pending_email', userData.email)
        console.log('🔄 Redirecting to OTP page')
        window.location.href = 'otp.html'
        return responseData
      }
      
      return responseData
    } catch (error: any) {
      console.error('❌ Register error:', error)
      console.error('❌ Full error response JSON:', JSON.stringify(error.response?.data, null, 2))
      
      // Show server error message if available
      const serverMessage = error.response?.data?.message || error.message
      console.error('❌ Server message:', serverMessage)
      
      throw new Error(serverMessage)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    clearSecureToken()
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
