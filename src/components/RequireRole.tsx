import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

type Role = 'super_admin' | 'admin' | 'user'

interface RequireRoleProps {
  children: React.ReactNode
  allowedRoles: Role[]
  fallback?: 'redirect' | 'noaccess'
}

const RequireRole: React.FC<RequireRoleProps> = ({ 
  children, 
  allowedRoles, 
  fallback = 'redirect' 
}) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const userRole = user.role as Role
  const hasPermission = allowedRoles.includes(userRole)

  if (!hasPermission) {
    if (fallback === 'noaccess') {
      return <Navigate to="/no-access" replace />
    }
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default RequireRole
