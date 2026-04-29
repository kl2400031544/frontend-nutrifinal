import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi } from '../api/authApi'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authApi.login(email, password)
          const { token, user } = response.data
          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
          })
          return { success: true, user }
        } catch (err) {
          set({
            error: err.response?.data?.message || 'Login failed',
            isLoading: false,
          })
          return { success: false, error: err.response?.data?.message }
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authApi.register(data)
          const { token, user } = response.data
          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
          })
          return { success: true, user }
        } catch (err) {
          set({
            error: err.response?.data?.message || 'Registration failed',
            isLoading: false,
          })
          return { success: false, error: err.response?.data?.message }
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        })
      },

      setUser: (user) => set({ user }),

      initAuth: async () => {
        const token = get().token
        const user = get().user
        
        if (!token || !user) return
        
        // If we have token and user, mark as authenticated
        set({ isAuthenticated: true, isLoading: false })
      },
    }),
    {
      name: 'nutriguard_token',
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
