import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const logout = async (redirectPath = "/") => {
    setIsLoading(true)
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push(redirectPath)
            router.refresh() 
          },
          onError: (ctx) => {
             // Optional: Add toast notification here
             console.error("Logout failed", ctx.error)
          }
        },
      })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return { logout, isLoading }
}