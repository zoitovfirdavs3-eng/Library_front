import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NoAccess: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              If you believe this is an error, please contact your system administrator.
            </p>
            <div className="flex gap-2">
              <Button 
                onClick={() => navigate('/')} 
                className="flex-1"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="flex-1"
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default NoAccess
