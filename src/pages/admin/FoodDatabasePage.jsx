import { useState } from 'react'
import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import toast from 'react-hot-toast'

const MOCK_FOODS = [
  { id: 1, name: 'Rice', category: 'Grains', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, iron: 0.8, calcium: 10 },
  { id: 2, name: 'Dal', category: 'Protein', calories: 101, protein: 7.5, carbs: 18, fat: 0.5, iron: 3.2, calcium: 50 },
  { id: 3, name: 'Milk', category: 'Dairy', calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, iron: 0.1, calcium: 113 },
]

export default function FoodDatabasePage() {
  const [foods, setFoods] = useState(MOCK_FOODS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFood, setEditingFood] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    category: 'Grains',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    iron: '',
    calcium: '',
  })

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenModal = (food = null) => {
    if (food) {
      setEditingFood(food)
      setFormData(food)
    } else {
      setEditingFood(null)
      setFormData({
        name: '',
        category: 'Grains',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        fiber: '',
        iron: '',
        calcium: '',
      })
    }
    setIsModalOpen(true)
  }

  const handleSaveFood = () => {
    if (!formData.name) {
      toast.error('Food name is required')
      return
    }

    if (editingFood) {
      setFoods((prev) =>
        prev.map((f) =>
          f.id === editingFood.id ? { ...formData, id: f.id } : f
        )
      )
      toast.success('Food item updated')
    } else {
      setFoods((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ])
      toast.success('Food item created')
    }
    setIsModalOpen(false)
  }

  const handleDeleteFood = (id) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      setFoods((prev) => prev.filter((f) => f.id !== id))
      toast.success('Food item deleted')
    }
  }

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-semibold text-3xl text-slate-900">
            Food Database
          </h1>
          <Button leftIcon={<Plus size={18} />} onClick={() => handleOpenModal()}>
            Add Food Item
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search foods..."
              leftIcon={<Search size={18} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            <option>All Categories</option>
            <option>Grains</option>
            <option>Dairy</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Protein</option>
            <option>Snacks</option>
          </select>
        </div>

        {/* Food Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 text-slate-600 font-medium">Name</th>
                  <th className="text-left py-3 text-slate-600 font-medium">Category</th>
                  <th className="text-left py-3 text-slate-600 font-medium">Cal/100g</th>
                  <th className="text-left py-3 text-slate-600 font-medium">Protein</th>
                  <th className="text-left py-3 text-slate-600 font-medium">Carbs</th>
                  <th className="text-left py-3 text-slate-600 font-medium">Fat</th>
                  <th className="text-left py-3 text-slate-600 font-medium">Iron</th>
                  <th className="text-left py-3 text-slate-600 font-medium">Calcium</th>
                  <th className="text-left py-3 text-slate-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFoods.map((food) => (
                  <tr key={food.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 font-medium text-slate-900">{food.name}</td>
                    <td className="py-3 text-slate-700">{food.category}</td>
                    <td className="py-3 text-slate-700">{food.calories}</td>
                    <td className="py-3 text-slate-700">{food.protein}g</td>
                    <td className="py-3 text-slate-700">{food.carbs}g</td>
                    <td className="py-3 text-slate-700">{food.fat}g</td>
                    <td className="py-3 text-slate-700">{food.iron || '-'}mg</td>
                    <td className="py-3 text-slate-700">{food.calcium || '-'}mg</td>
                    <td className="py-3 flex gap-2">
                      <button
                        onClick={() => handleOpenModal(food)}
                        className="text-brand-600 hover:text-brand-700"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteFood(food.id)}
                        className="text-rose-600 hover:text-rose-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingFood ? 'Edit Food Item' : 'Add Food Item'}
          size="lg"
        >
          <div className="space-y-4">
            <Input
              label="Food Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Rice"
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                <option>Grains</option>
                <option>Dairy</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Protein</option>
                <option>Snacks</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Calories (per 100g)"
                type="number"
                value={formData.calories}
                onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
              />
              <Input
                label="Protein (g)"
                type="number"
                value={formData.protein}
                onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Carbs (g)"
                type="number"
                value={formData.carbs}
                onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
              />
              <Input
                label="Fat (g)"
                type="number"
                value={formData.fat}
                onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Iron (mg)"
                type="number"
                value={formData.iron}
                onChange={(e) => setFormData({ ...formData, iron: e.target.value })}
              />
              <Input
                label="Calcium (mg)"
                type="number"
                value={formData.calcium}
                onChange={(e) => setFormData({ ...formData, calcium: e.target.value })}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSaveFood}>
                Save Food Item
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AppShell>
  )
}
