import { useMealStore } from '../store/mealStore'

export const useMeals = () => {
  const { meals, selectedDate, isLoading, addMeal, removeMeal, setMeals } =
    useMealStore()

  return {
    meals,
    selectedDate,
    isLoading,
    addMeal,
    removeMeal,
    setMeals,
  }
}
