import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - token qo'shish
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // DEBUG: Log final request URL
    const baseURL = config.baseURL || ''
    const url = config.url || ''
    console.log('🌐 API Request:', config.method?.toUpperCase(), baseURL + url)
    
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
      console.log('🔐 401 Unauthorized - clearing token and redirecting')
      localStorage.removeItem('accessToken')
      
      // Prevent infinite redirects
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        console.log('🔄 Redirecting to login')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
