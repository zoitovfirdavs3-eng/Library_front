import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Build payload object, exclude empty phone field
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        // Only include phone if it's not empty
        ...(formData.phone && formData.phone.trim() !== '' && { phone: formData.phone.trim() })
      }

      console.log('📤 Register payload:', payload)
      
      const response = await register(payload) as any
      
      console.log('📥 Register response:', response)
      
      // STRICT: Check for success with OTP redirect
      if (response?.status === 200 && response?.next === "/verify-email") {
        console.log('✅ Registration successful - REDIRECTING TO OTP')
        toast({
          title: "Muvaffaqaqiyatli!",
          description: "Ro'yxatdan o'tdingiz. Emailingizga tasdiqlash kodi yuborildi.",
        })
        
        // Store pending email for OTP page
        const emailToStore = response.email || formData.email
        localStorage.setItem('pending_email', emailToStore)
        console.log('💾 Stored pending_email:', emailToStore)
        
        // STRICT: Redirect to OTP, NEVER auto-login
        window.location.href = '/otp.html' // Use absolute path for static deployment
        return
      }
      
      // ANY other response = error (register should never return token)
      console.error('❌ Register failed or unexpected response:', response)
      throw new Error(response?.message || 'Ro\'yxatdan o\'tishda xatolik')
    } catch (error: any) {
      toast({
        title: "Xatolik!",
        description: error.response?.data?.message || "Ro'yxatdan o'tish xatolik",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Ro'yxatdan o'tish</CardTitle>
          <CardDescription className="text-center">
            Yangi hisob yaratish uchun ma'lumotlarni kiriting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">Ism</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="Ali"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Familiya</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Valiyev"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon (ixtiyoriy)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+998901234567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Hisobingiz bormi?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Kirish
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
