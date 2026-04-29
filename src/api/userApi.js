import axiosInstance from './axiosInstance'
import { mockMeals, mockNutrients, mockDeficiencies, mockFoods } from '../utils/mockData'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const userApi = {
  getMeals: async (date) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: mockMeals }
    }
    return axiosInstance.get('/user/meals', { params: { date } })
  },
  
  logMeal: async (data) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const newMeal = { id: Math.random(), ...data, totalCalories: 200 }
      return { data: newMeal }
    }
    return axiosInstance.post('/user/meals', data)
  },
  
  deleteMeal: async (mealId) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { success: true } }
    }
    return axiosInstance.delete(`/user/meals/${mealId}`)
  },
  
  getNutrients: async (dateRange) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: mockNutrients }
    }
    return axiosInstance.get('/user/nutrients', { params: { ...dateRange } })
  },
  
  getDietPlan: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { id: 1, name: 'Week 1 Plan', meals: [] } }
    }
    return axiosInstance.get('/user/diet-plan')
  },
  
  generateDietPlan: async (preferences) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { data: { id: Math.random(), name: 'AI Generated Plan', meals: [] } }
    }
    return axiosInstance.post('/user/diet-plan/generate', preferences)
  },
  
  getFoodSwaps: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: [] }
    }
    return axiosInstance.get('/user/food-swaps')
  },
  
  getProgress: async (dateRange) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { deficiencies: mockDeficiencies, trends: [] } }
    }
    return axiosInstance.get('/user/progress', { params: { ...dateRange } })
  },
  
  updateProfile: async (data) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { success: true } }
    }
    return axiosInstance.put('/user/profile', data)
  },
  
  changePassword: async (data) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { data: { success: true } }
    }
    return axiosInstance.post('/user/change-password', data)
  },
}
