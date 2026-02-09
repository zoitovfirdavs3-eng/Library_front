// Centralized type definitions
export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  role: string
}

export interface RegisterData {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface ApiResponse<T = any> {
  data: T
  message?: string
  status?: number
  next?: string
  need_otp?: boolean
  accessToken?: string
  token?: string
}

export interface AuthResponse {
  user: User
  accessToken: string
}
