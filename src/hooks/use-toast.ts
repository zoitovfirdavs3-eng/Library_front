import * as React from "react"

export function useToast() {
  const [toasts, setToasts] = React.useState<
    Array<{
      id: string
      title?: React.ReactNode
      description?: React.ReactNode
      action?: React.ReactNode
      variant?: "default" | "destructive"
    }>
  >([])

  const toast = React.useCallback(
    ({
      title,
      description,
      variant,
      duration = 5000,
    }: {
      title?: React.ReactNode
      description?: React.ReactNode
      variant?: "default" | "destructive"
      duration?: number
    }) => {
      const id = Math.random().toString(36).substr(2, 9)
      
      setToasts((prev) => [...prev, { id, title, description, variant }])
      
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, duration)
    },
    []
  )

  return {
    toast,
    toasts,
  }
}
