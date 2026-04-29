import { useState } from 'react'
import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function FoodSwapPage() {
  const [filter, setFilter] = useState('All')
  const [dismissedSwaps, setDismissedSwaps] = useState([])

  const foodSwaps = [
    {
      id: 1,
      deficiency: 'Iron',
      from: 'White Rice',
      to: 'Brown Rice',
      reason: 'Brown rice has 1.8x more iron',
      gain: '+2.8 mg Iron per 100g',
    },
    {
      id: 2,
      deficiency: 'Calcium',
      from: 'Regular Milk',
      to: 'Fortified Milk',
      reason: 'Fortified varieties have added calcium',
      gain: '+200 mg Calcium per cup',
    },
    {
      id: 3,
      deficiency: 'Vitamin D',
      from: 'Regular Butter',
      to: 'Fortified Butter',
      reason: 'Fortified options include vitamin D',
      gain: '+0.5 mcg Vitamin D per tbsp',
    },
    {
      id: 4,
      deficiency: 'Iron',
      from: 'Iceberg Lettuce',
      to: 'Spinach',
      reason: 'Spinach is rich in bioavailable iron',
      gain: '+3.2 mg Iron per 100g',
    },
  ]

  const filters = ['All', 'Iron', 'Calcium', 'Vitamin D']
  const filteredSwaps =
    filter === 'All'
      ? foodSwaps
      : foodSwaps.filter((swap) => swap.deficiency === filter)

  const visibleSwaps = filteredSwaps.filter((swap) => !dismissedSwaps.includes(swap.id))

  const handleDismiss = (id) => {
    setDismissedSwaps((prev) => [...prev, id])
  }

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="font-display font-semibold text-3xl text-slate-900 mb-1">
            Smarter Swaps
          </h1>
          <p className="text-slate-600">
            Replace common foods with more nutritious alternatives
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === f
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Swap Cards */}
        {visibleSwaps.length === 0 ? (
          <Card className="text-center py-12">
            <CheckCircle size={48} className="text-brand-500 mx-auto mb-3" />
            <h2 className="font-semibold text-slate-900 mb-1">Great job!</h2>
            <p className="text-slate-600">Check back tomorrow for new swap suggestions</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleSwaps.map((swap) => (
              <Card key={swap.id} className="flex flex-col justify-between">
                <div className="mb-4">
                  <Badge variant="info" className="mb-3">
                    {swap.deficiency} deficiency
                  </Badge>

                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Replace</p>
                      <p className="font-semibold text-slate-900">{swap.from}</p>
                    </div>

                    <ArrowRight size={20} className="text-slate-400 mt-2" />

                    <div>
                      <p className="text-xs text-slate-500 mb-1">With</p>
                      <p className="font-semibold text-brand-600">{swap.to}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-3">{swap.reason}</p>

                  <Badge variant="success">{swap.gain}</Badge>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDismiss(swap.id)}
                >
                  Got it
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
