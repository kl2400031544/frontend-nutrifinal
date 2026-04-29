import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import FoodSearchCombobox from '../../components/shared/FoodSearchCombobox'
import { formatDate, formatCalories } from '../../utils/formatters'
import { useSync } from '../../hooks/useSync'
import toast from 'react-hot-toast'

const MOCK_FOODS = [
  {
    id: 1,
    name: 'Rice (cooked)',
    category: 'Grains',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
  },
  {
    id: 2,
    name: 'Dal (cooked)',
    category: 'Protein',
    calories: 101,
    protein: 7.5,
    carbs: 18,
    fat: 0.5,
    fiber: 6,
  },
  {
    id: 3,
    name: 'Spinach',
    category: 'Vegetables',
    calories: 23,
    protein: 2.7,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
  },
  {
    id: 4,
    name: 'Milk',
    category: 'Dairy',
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fat: 3.3,
    fiber: 0,
  },
]

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']

export default function MealLogPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMealType, setSelectedMealType] = useState('Breakfast')
  const { trackMealLogged, trackMealDeleted } = useSync()

  const [meals, setMeals] = useState({
    Breakfast: [
      { id: 1, name: 'Milk', portion: 200, calories: 122 },
      { id: 2, name: 'Cereal', portion: 40, calories: 150 },
    ],
    Lunch: [
      { id: 3, name: 'Rice', portion: 100, calories: 130 },
      { id: 4, name: 'Dal', portion: 150, calories: 151 },
      { id: 5, name: 'Spinach', portion: 100, calories: 23 },
    ],
    Dinner: [],
    Snacks: [{ id: 6, name: 'Apple', portion: 150, calories: 81 }],
  })

  const addFoodToMeal = (food, portion) => {
    const calories = (food.calories * portion) / 100
    const newFood = {
      id: Date.now(),
      name: food.name,
      portion,
      calories: Math.round(calories),
    }
    
    setMeals((prev) => ({
      ...prev,
      [selectedMealType]: [
        ...prev[selectedMealType],
        newFood,
      ],
    }))

    // Track meal logged for sync
    trackMealLogged({
      mealType: selectedMealType,
      date: selectedDate,
      foods: [newFood],
      totalCalories: calories,
    })

    toast.success(`${food.name} added to ${selectedMealType}`)
    setIsModalOpen(false)
  }

  const removeFoodFromMeal = (mealType, foodId) => {
    const removedFood = meals[mealType].find(f => f.id === foodId)
    
    setMeals((prev) => ({
      ...prev,
      [mealType]: prev[mealType].filter((f) => f.id !== foodId),
    }))

    // Track meal deleted for sync
    trackMealDeleted(foodId)
    toast.success(`${removedFood?.name} removed from ${mealType}`)
  }

  const calculateMealTotal = (mealType) => {
    return meals[mealType].reduce((sum, food) => sum + food.calories, 0)
  }

  const calculateDailyTotal = () => {
    return Object.values(meals).reduce(
      (sum, mealFoods) => sum + mealFoods.reduce((s, f) => s + f.calories, 0),
      0
    )
  }

  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + days)
    setSelectedDate(newDate)
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-semibold text-3xl text-slate-900">Meal Log</h1>

          {/* Date Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleDateChange(-1)}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="min-w-[150px] text-center font-medium">
              {formatDate(selectedDate)}
            </span>
            <button
              onClick={() => handleDateChange(1)}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Meal Sections */}
        <div className="space-y-4">
          {MEAL_TYPES.map((mealType) => (
            <div key={mealType}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-slate-900">{mealType}</h2>
                <span className="text-sm text-slate-600">
                  {calculateMealTotal(mealType)} kcal
                </span>
              </div>

              <Card className="space-y-2">
                {meals[mealType].length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-slate-500 text-sm mb-3">No foods logged</p>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setSelectedMealType(mealType)
                        setIsModalOpen(true)
                      }}
                    >
                      Add food
                    </Button>
                  </div>
                ) : (
                  <>
                    {meals[mealType].map((food) => (
                      <div
                        key={food.id}
                        className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg group"
                      >
                        <div>
                          <p className="font-medium text-slate-900">{food.name}</p>
                          <p className="text-xs text-slate-500">{food.portion}g</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-slate-900">
                            {food.calories} kcal
                          </span>
                          <button
                            onClick={() => removeFoodFromMeal(mealType, food.id)}
                            className="opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-600 transition text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setSelectedMealType(mealType)
                        setIsModalOpen(true)
                      }}
                      className="w-full p-2 text-brand-600 hover:bg-slate-50 rounded-lg transition text-sm font-medium flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add another food
                    </button>
                  </>
                )}
              </Card>
            </div>
          ))}
        </div>

        {/* Daily Summary */}
        <Card className="bg-gradient-to-r from-brand-50 to-brand-50 border-brand-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Daily Total</p>
              <p className="font-display font-semibold text-3xl text-slate-900">
                {calculateDailyTotal()} kcal
              </p>
              <p className="text-xs text-slate-500 mt-1">Goal: 2000 kcal</p>
            </div>
            <div className="w-32 h-32 rounded-full bg-white border-8 border-brand-500 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-brand-600">
                  {Math.round((calculateDailyTotal() / 2000) * 100)}%
                </p>
                <p className="text-xs text-slate-600">Complete</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Add Food Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Add food to ${selectedMealType}`}
        >
          <FoodSearchCombobox
            foods={MOCK_FOODS}
            onSelect={addFoodToMeal}
          />
        </Modal>
      </div>
    </AppShell>
  )
}
