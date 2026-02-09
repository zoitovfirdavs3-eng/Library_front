import axios from 'axios'
import { logger } from '@/utils/logger'
import { getSecureToken, clearSecureToken } from '@/utils/security'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - token qo'shish
api.interceptors.request.use(
  (config) => {
    const token = getSecureToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // DEBUG: Log final request URL
    const baseURL = config.baseURL || ''
    const url = config.url || ''
    logger.log('🌐 API Request:', config.method?.toUpperCase(), baseURL + url)
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - xatoliklarni boshqarish
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logger.log('🔐 401 Unauthorized - clearing token and redirecting')
      clearSecureToken()
      
      // Prevent infinite redirects
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        logger.log('🔄 Redirecting to login')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
