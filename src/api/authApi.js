import axiosInstance from './axiosInstance'
import { mockUser, mockAdmin, mockToken } from '../utils/mockData'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const MOCK_USERS_KEY = 'nutriguard_mock_users'
const MOCK_CURRENT_USER_KEY = 'nutriguard_mock_current_user'

const loadMockUsers = () => {
  try {
    const raw = localStorage.getItem(MOCK_USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveMockUsers = (users) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
}

const ensureMockUsers = () => {
  const existing = loadMockUsers()
  if (existing.length > 0) return existing

  const seeded = [
    { ...mockAdmin, password: 'Admin@123' },
    { ...mockUser, password: 'User@123' },
  ]
  saveMockUsers(seeded)
  return seeded
}

const stripPassword = (user) => {
  if (!user) return user
  const { password, ...safeUser } = user
  return safeUser
}

export const authApi = {
  login: async (email, password) => {
    if (USE_MOCK) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const users = ensureMockUsers()
      const matchedUser = users.find(
        (u) => u.email === email && u.password === password
      )

      if (!matchedUser) {
        const error = new Error('Invalid email or password')
        error.response = { data: { message: 'Invalid email or password' } }
        throw error
      }

      localStorage.setItem(MOCK_CURRENT_USER_KEY, JSON.stringify(stripPassword(matchedUser)))
      return { data: { user: stripPassword(matchedUser), token: mockToken } }
    }
    return axiosInstance.post('/auth/login', { email, password })
  },
  
  register: async (data) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500))

      const users = ensureMockUsers()
      const exists = users.some((u) => u.email === data.email)
      if (exists) {
        const error = new Error('Email already registered')
        error.response = { data: { message: 'Email already registered' } }
        throw error
      }

      const newUser = {
        ...mockUser,
        ...data,
        id: Math.random(),
        password: data.password,
      }
      const nextUsers = [...users, newUser]
      saveMockUsers(nextUsers)
      localStorage.setItem(MOCK_CURRENT_USER_KEY, JSON.stringify(stripPassword(newUser)))
      return { data: { user: stripPassword(newUser), token: mockToken } }
    }
    return axiosInstance.post('/auth/register', data)
  },
  
  getMe: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const rawUser = localStorage.getItem(MOCK_CURRENT_USER_KEY)
      if (!rawUser) {
        const error = new Error('No user found')
        error.response = { data: { message: 'No user found' } }
        throw error
      }
      return { data: JSON.parse(rawUser) }
    }
    return axiosInstance.get('/auth/me')
  },
  
  logout: async () => {
    if (USE_MOCK) {
      localStorage.removeItem(MOCK_CURRENT_USER_KEY)
      return { data: { success: true } }
    }
    return axiosInstance.post('/auth/logout')
  },
}
