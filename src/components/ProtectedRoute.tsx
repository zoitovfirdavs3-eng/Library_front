import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth()

  // Safety guard: redirect if loading takes too long
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.warn('⚠️ ProtectedRoute: Loading taking too long, checking localStorage')
        const token = localStorage.getItem('accessToken')
        if (!token || token === 'undefined' || token === 'null') {
          console.warn('⚠️ ProtectedRoute: No valid token found, should redirect')
          window.location.href = '/login'
        }
      }
    }, 5000) // 5 second timeout

    return () => clearTimeout(timer)
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    console.log('🚫 ProtectedRoute: No user found, redirecting to login')
    return <Navigate to="/login" replace />
  }

  console.log('✅ ProtectedRoute: User authenticated, rendering children')
  return <>{children}</>
}

export default ProtectedRoute
