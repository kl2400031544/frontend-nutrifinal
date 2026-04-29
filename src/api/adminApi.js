import axiosInstance from './axiosInstance'
import { mockFoods } from '../utils/mockData'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const adminApi = {
  getDashboard: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { totalUsers: 1240, activeToday: 342, criticalCases: 47, interventionsSent: 189 } }
    }
    return axiosInstance.get('/admin/dashboard')
  },
  
  getFoods: async (page, filters) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { foods: mockFoods, total: mockFoods.length, page } }
    }
    return axiosInstance.get('/admin/foods', { params: { page, ...filters } })
  },
  
  createFood: async (data) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const newFood = { id: Math.random(), ...data }
      return { data: newFood }
    }
    return axiosInstance.post('/admin/foods', data)
  },
  
  updateFood: async (foodId, data) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { id: foodId, ...data } }
    }
    return axiosInstance.put(`/admin/foods/${foodId}`, data)
  },
  
  deleteFood: async (foodId) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { success: true } }
    }
    return axiosInstance.delete(`/admin/foods/${foodId}`)
  },
  
  importFoods: async (file) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { data: { imported: 10, errors: 0 } }
    }
    const formData = new FormData()
    formData.append('file', file)
    return axiosInstance.post('/admin/foods/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  
  getUsers: async (page, filters) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { users: [], total: 0, page } }
    }
    return axiosInstance.get('/admin/users', { params: { page, ...filters } })
  },
  
  getUserDetails: async (userId) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { id: userId, name: 'User' } }
    }
    return axiosInstance.get(`/admin/users/${userId}`)
  },
  
  deactivateUser: async (userId) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { success: true } }
    }
    return axiosInstance.post(`/admin/users/${userId}/deactivate`)
  },
  
  getRDAConfig: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: {} }
    }
    return axiosInstance.get('/admin/rda-config')
  },
  
  updateRDA: async (data) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { success: true } }
    }
    return axiosInstance.put('/admin/rda-config', data)
  },
  
  resetRDADefaults: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { success: true } }
    }
    return axiosInstance.post('/admin/rda-config/reset')
  },
  
  getPendingInterventions: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: [] }
    }
    return axiosInstance.get('/admin/interventions/pending')
  },
  
  sendIntervention: async (data) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { success: true } }
    }
    return axiosInstance.post('/admin/interventions/send', data)
  },
  
  scheduleIntervention: async (data) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { success: true } }
    }
    return axiosInstance.post('/admin/interventions/schedule', data)
  },
  
  getInterventionHistory: async (page) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { interventions: [], total: 0, page } }
    }
    return axiosInstance.get('/admin/interventions/history', { params: { page } })
  },
  
  getAnalytics: async (filters) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: {} }
    }
    return axiosInstance.get('/admin/analytics', { params: filters })
  },
}
