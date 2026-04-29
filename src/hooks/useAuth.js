import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, login, register, logout, initAuth } =
    useAuthStore()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  }
}
