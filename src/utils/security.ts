// Security utilities
export const setSecureToken = (token: string) => {
  // In production, consider using httpOnly cookies
  localStorage.setItem('accessToken', token)
}

export const getSecureToken = (): string | null => {
  return localStorage.getItem('accessToken')
}

export const clearSecureToken = () => {
  localStorage.removeItem('accessToken')
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}
