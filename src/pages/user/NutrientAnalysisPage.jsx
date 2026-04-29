import { useState, useEffect } from 'react'
import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import NutrientCard from '../../components/shared/NutrientCard'
import DeficiencyBarChart from '../../components/charts/DeficiencyBarChart'
import { NUTRIENTS } from '../../constants/nutrients'
import { ChevronRight } from 'lucide-react'
import { useSync, useSyncListener } from '../../hooks/useSync'

export default function NutrientAnalysisPage() {
  const { trackDeficiency } = useSync()
  const [dateRange, setDateRange] = useState('today')

  // Real-time listener for meal logging
  useSyncListener('meal_logged', (data) => {
    console.log('Analysis refreshed due to meal log:', data)
    // In a real app, this would trigger a refetch of nutrition data
    // For the sync demo, we also check for specific nutrient alerts
    if (data.analysis?.criticalDeficiencies) {
      data.analysis.criticalDeficiencies.forEach(def => {
        trackDeficiency(def.name, 'critical', def.value)
      })
    }
  })

  const nutrientData = {
    [NUTRIENTS.IRON]: { current: 7.2, rda: 8 },
    [NUTRIENTS.CALCIUM]: { current: 950, rda: 1200 },
    [NUTRIENTS.VITAMIN_D]: { current: 8, rda: 15 },
    [NUTRIENTS.VITAMIN_B12]: { current: 1.2, rda: 1.5 },
    [NUTRIENTS.ZINC]: { current: 4.5, rda: 5 },
    [NUTRIENTS.PROTEIN]: { current: 45, rda: 28 },
    [NUTRIENTS.FIBER]: { current: 18, rda: 25 },
    [NUTRIENTS.VITAMIN_C]: { current: 52, rda: 50 },
    [NUTRIENTS.FOLATE]: { current: 180, rda: 200 },
    [NUTRIENTS.MAGNESIUM]: { current: 220, rda: 240 },
    [NUTRIENTS.POTASSIUM]: { current: 2800, rda: 3100 },
    [NUTRIENTS.OMEGA3]: { current: 1.0, rda: 1.2 },
  }

  const deficiencyChartData = [
    { nutrient: 'Vitamin D', deficiency: 47 },
    { nutrient: 'Calcium', deficiency: 21 },
    { nutrient: 'Iron', deficiency: 10 },
    { nutrient: 'Zinc', deficiency: 10 },
    { nutrient: 'Folate', deficiency: 10 },
  ]

  const handleNutrientClick = (nutrient) => {
    // Show detail panel
    console.log('Clicked nutrient:', nutrient)
  }

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-semibold text-3xl text-slate-900">
            Nutrient Analysis
          </h1>

          {/* Date Range Selector */}
          <div className="flex gap-2">
            {['today', 'week', 'month'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  dateRange === range
                    ? 'bg-brand-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {range === 'today' ? 'Today' : range === 'week' ? 'This Week' : 'This Month'}
              </button>
            ))}
          </div>
        </div>

        {/* Nutrient Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(nutrientData).map(([nutrient, { current, rda }]) => (
            <button
              key={nutrient}
              onClick={() => handleNutrientClick(nutrient)}
              className="hover:shadow-elevated transition"
            >
              <NutrientCard
                nutrient={nutrient}
                current={current}
                rda={rda}
              />
            </button>
          ))}
        </div>

        {/* Radar Chart Section */}
        <Card>
          <h2 className="font-semibold text-slate-900 mb-4">Nutrient Overview</h2>
          <div className="h-96 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
            <div className="text-center">
              <p className="text-slate-600 font-medium mb-2">Radar Chart View</p>
              <p className="text-sm text-slate-500">Visualize all nutrients vs RDA</p>
            </div>
          </div>
        </Card>

        {/* Deficiency Summary */}
        <Card>
          <h2 className="font-semibold text-slate-900 mb-4">Deficiency Summary</h2>
          <DeficiencyBarChart data={deficiencyChartData} />
        </Card>

        {/* Top Deficiencies */}
        <div>
          <h2 className="font-semibold text-slate-900 mb-3">Nutrients Needing Attention</h2>
          <div className="space-y-2">
            {[
              {
                nutrient: 'Vitamin D',
                current: 8,
                rda: 15,
                percent: 53,
                sources: 'Fortified milk, sunlight exposure, fatty fish',
              },
              {
                nutrient: 'Calcium',
                current: 950,
                rda: 1200,
                percent: 79,
                sources: 'Milk, yogurt, cheese, leafy greens',
              },
            ].map((item) => (
              <Card key={item.nutrient} className="cursor-pointer hover:shadow-elevated transition">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{item.nutrient}</h3>
                      <Badge variant={item.percent < 70 ? 'warning' : 'success'}>
                        {item.percent}%
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      {item.current} / {item.rda} units
                    </p>
                    <p className="text-xs text-slate-500">Top sources: {item.sources}</p>
                  </div>
                  <ChevronRight className="text-slate-400" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
