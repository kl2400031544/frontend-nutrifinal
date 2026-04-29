import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import Input from '../ui/Input'
import Spinner from '../ui/Spinner'
import { formatNutrient } from '../../utils/formatters'

export default function FoodSearchCombobox({
  foods = [],
  onSelect,
  isLoading = false,
}) {
  const [query, setQuery] = useState('')
  const [portion, setPortion] = useState(100)
  const [isOpen, setIsOpen] = useState(false)
  const [filteredFoods, setFilteredFoods] = useState([])

  useEffect(() => {
    if (query.length < 2) {
      setFilteredFoods([])
      return
    }

    const filtered = foods.filter((food) =>
      food.name.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredFoods(filtered)
  }, [query, foods])

  const handleSelect = (food) => {
    onSelect(food, portion)
    setQuery('')
    setPortion(100)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Input
        placeholder="Search foods..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setIsOpen(true)
        }}
        leftIcon={<Search size={18} />}
        onFocus={() => query.length > 0 && setIsOpen(true)}
      />

      {isOpen && (query.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-elevated z-50 max-h-80 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Spinner size="sm" />
            </div>
          ) : filteredFoods.length === 0 ? (
            <div className="p-4 text-center text-slate-500 text-sm">
              No foods found. Try a different name.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredFoods.map((food) => (
                <div
                  key={food.id}
                  className="p-3 hover:bg-slate-50 cursor-pointer transition"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-slate-900">{food.name}</span>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">
                      {food.category}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-2">
                    <div>{formatNutrient(food.calories, 'calories')}/100g</div>
                    <div>P: {food.protein}g</div>
                    <div>C: {food.carbs}g</div>
                    <div>F: {food.fat}g</div>
                  </div>
                  <button
                    onClick={() => handleSelect(food)}
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    Add {portion}g to meal
                  </button>
                </div>
              ))}
            </div>
          )}

          {filteredFoods.length > 0 && (
            <div className="p-4 border-t border-slate-100">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Portion (grams): {portion}g
              </label>
              <input
                type="range"
                min="10"
                max="500"
                value={portion}
                onChange={(e) => setPortion(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
