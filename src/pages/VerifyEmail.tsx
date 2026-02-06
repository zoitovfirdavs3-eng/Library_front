import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import api from '@/api/index'

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const email = searchParams.get('email') || ''
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Handle countdown for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      navigate('/register')
    }
  }, [email, navigate])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (code.length !== 6) {
      toast({
        title: "Xatolik!",
        description: "Iltimos, 6 xonali kodni kiriting",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await api.post('/auth/verify-email', {
        email,
        code
      })

      toast({
        title: "Muvaffaqiyatli!",
        description: "Email tasdiqlandi. Endi tizimga kirishingiz mumkin.",
      })

      // Always redirect to login after successful verification
      // Token is only obtained at login step
      navigate('/login')
    } catch (error: any) {
      let errorMessage = "Emailni tasdiqlashda xatolik"
      
      if (error.response?.status === 400) {
        errorMessage = "Noto'g'ri kod"
      } else if (error.response?.status === 410) {
        errorMessage = "Kod muddati tugagan. Qayta yuboring."
      } else if (error.response?.status === 429) {
        errorMessage = "Juda ko'p urunish. Keyinroq urinib ko'ring."
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }

      toast({
        title: "Xatolik!",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (countdown > 0) return

    setResendLoading(true)

    try {
      await api.post('/auth/resend-code', { email })
      
      toast({
        title: "Yuborildi!",
        description: "Yangi kod emailingizga yuborildi.",
      })

      // Start 60 second countdown
      setCountdown(60)
    } catch (error: any) {
      toast({
        title: "Xatolik!",
        description: error.response?.data?.message || "Kodni qayta yuborishda xatolik",
        variant: "destructive",
      })
    } finally {
      setResendLoading(false)
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '') // Only numbers
    if (value.length <= 6) {
      setCode(value)
    }
  }

  if (!email) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Emailni Tasdiqlash</CardTitle>
          <CardDescription className="text-center">
            <p>{email} ga yuborilgan 6 xonali kodni kiriting</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Tasdiqlash kodi</Label>
              <Input
                id="code"
                type="text"
                placeholder="123456"
                value={code}
                onChange={handleCodeChange}
                maxLength={6}
                className="text-center text-lg font-mono"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || code.length !== 6}>
              {isLoading ? 'Tasdiqlanmoqda...' : 'Tasdiqlash'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={handleResend}
              disabled={resendLoading || countdown > 0}
              className="text-sm"
            >
              {resendLoading 
                ? 'Yuborilmoqda...' 
                : countdown > 0 
                  ? `Qayta yuborish (${countdown}s)` 
                  : 'Kodni qayta yuborish'
              }
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            <Button
              variant="link"
              onClick={() => navigate('/login')}
              className="p-0 h-auto"
            >
              Tizimga kirish
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmail
