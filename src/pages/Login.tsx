import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, user, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!authLoading && user) {
      console.log('🔄 User already authenticated, redirecting to dashboard')
      navigate('/dashboard', { replace: true })
    }
  }, [user, authLoading, navigate])

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Don't render login form if user is authenticated
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
      toast({
        title: "Muvaffaqiyatli!",
        description: "Tizimga muvaffaqiyatli kirdingiz.",
      })
      navigate('/dashboard')
    } catch (error: any) {
      console.error('Login error:', error)
      
      // Check for 403 with next field (OTP verification required)
      if (error.response?.status === 403 && error.response?.data?.next === "/verify-email") {
        console.log('🔐 403 with next="/verify-email" - REDIRECTING TO OTP')
        toast({
          title: "OTP talab qilinadi!",
          description: "Emailingizni tasdiqlang.",
        })
        
        // Store email and redirect to OTP page
        const emailToStore = error.response.data.email || email
        localStorage.setItem('pending_email', emailToStore)
        console.log('💾 Stored pending_email from login:', emailToStore)
        
        // STRICT: Always redirect to OTP, no exceptions
        window.location.href = '/otp.html' // Use absolute path for static deployment
        return
      }
      
      // Regular login error
      toast({
        title: "Xatolik!",
        description: error.response?.data?.message || "Login xatolik",
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
          <CardTitle className="text-2xl font-bold text-center">Kutubxona</CardTitle>
          <CardDescription className="text-center">
            Tizimga kirish uchun email va parolingizni kiriting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Kirilmoqda...' : 'Kirish'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Hisobingiz yo'qmi?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Ro'yxatdan o'tish
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
