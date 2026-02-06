import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Plus, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AdminManagement: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Management</h1>
        <p className="text-muted-foreground">Manage system administrators and permissions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Admin Users
            </CardTitle>
            <CardDescription>
              View and manage existing admin accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/admin-users')}
              className="w-full"
            >
              View Admin Users
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create Admin
            </CardTitle>
            <CardDescription>
              Add new administrator accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/create-admin')}
              className="w-full"
            >
              Create New Admin
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Permissions
            </CardTitle>
            <CardDescription>
              Configure role-based access control
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/permissions')}
              className="w-full"
              variant="outline"
            >
              Manage Permissions
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>
            Current admin accounts and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Super Admins</span>
              <span className="text-sm text-gray-600">2 active</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Admins</span>
              <span className="text-sm text-gray-600">5 active</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Regular Users</span>
              <span className="text-sm text-gray-600">124 active</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminManagement
