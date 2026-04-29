import { create } from 'zustand'

export const useMealStore = create((set) => ({
  meals: [],
  selectedDate: new Date(),
  isLoading: false,
  error: null,

  setMeals: (meals) => set({ meals }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  addMeal: (meal) => set((state) => ({ meals: [...state.meals, meal] })),
  removeMeal: (mealId) =>
    set((state) => ({
      meals: state.meals.filter((m) => m.id !== mealId),
    })),
}))
