import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Profile: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profil</h1>
        <p className="text-muted-foreground">Shaxsiy ma'lumotlaringiz</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shaxsiy ma'lumotlar</CardTitle>
          <CardDescription>
            Hisobingiz ma'lumotlari
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">Ism</Label>
              <Input
                id="first_name"
                value={user?.first_name || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Familiya</Label>
              <Input
                id="last_name"
                value={user?.last_name || ''}
                readOnly
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={user?.email || ''}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              value={user?.phone || 'Kiritilmagan'}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Rol</Label>
            <Input
              id="role"
              value={user?.role || ''}
              readOnly
            />
          </div>
          <Button className="w-full">
            Ma'lumotlarni yangilash (Tez orada)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile
