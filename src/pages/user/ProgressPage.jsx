import { useState } from 'react'
import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import WeeklyTrendChart from '../../components/charts/WeeklyTrendChart'
import DeficiencyBarChart from '../../components/charts/DeficiencyBarChart'
import { TrendingUp } from 'lucide-react'

export default function ProgressPage() {
  const [dateRange, setDateRange] = useState('7days')

  const trendData = [
    { date: 'Mon', Iron: 75, Calcium: 85, 'Vitamin D': 40 },
    { date: 'Tue', Iron: 82, Calcium: 92, 'Vitamin D': 45 },
    { date: 'Wed', Iron: 88, Calcium: 98, 'Vitamin D': 50 },
    { date: 'Thu', Iron: 85, Calcium: 95, 'Vitamin D': 48 },
    { date: 'Fri', Iron: 92, Calcium: 105, 'Vitamin D': 55 },
    { date: 'Sat', Iron: 96, Calcium: 110, 'Vitamin D': 60 },
    { date: 'Sun', Iron: 94, Calcium: 108, 'Vitamin D': 58 },
  ]

  const improvementData = [
    { nutrient: 'Iron', improvement: 25 },
    { nutrient: 'Calcium', improvement: 18 },
    { nutrient: 'Vitamin D', improvement: 40 },
    { nutrient: 'Zinc', improvement: 12 },
  ]

  const milestones = [
    { id: 1, emoji: '🎉', text: 'No Iron deficiency for 2 weeks', date: 'Mar 20' },
    { id: 2, emoji: '💪', text: 'Reached 2000 kcal goal 5 days straight', date: 'Mar 15' },
    { id: 3, emoji: '✨', text: 'Vitamin C levels normalized', date: 'Mar 10' },
  ]

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-semibold text-3xl text-slate-900">Progress</h1>

          <div className="flex gap-2">
            {['7days', '30days', '3months'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  dateRange === range
                    ? 'bg-brand-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {range === '7days' ? 'Last 7 days' : range === '30days' ? 'Last 30 days' : 'Last 3 months'}
              </button>
            ))}
          </div>
        </div>

        {/* Trend Chart */}
        <Card>
          <h2 className="font-semibold text-slate-900 mb-4">Nutrient Trends</h2>
          <WeeklyTrendChart
            data={trendData}
            nutrients={['Iron', 'Calcium', 'Vitamin D']}
          />
        </Card>

        {/* Improvement Chart */}
        <Card>
          <h2 className="font-semibold text-slate-900 mb-4">Improvements from Baseline</h2>
          <DeficiencyBarChart data={improvementData} />
        </Card>

        {/* Milestones */}
        <div>
          <h2 className="font-semibold text-slate-900 mb-3">Recent Milestones</h2>
          <div className="space-y-2">
            {milestones.map((milestone) => (
              <Card key={milestone.id} className="flex items-center gap-4 hover:shadow-elevated transition">
                <span className="text-3xl">{milestone.emoji}</span>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{milestone.text}</p>
                </div>
                <p className="text-xs text-slate-500">{milestone.date}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Logging Streak Calendar */}
        <Card>
          <h2 className="font-semibold text-slate-900 mb-4">Logging Streak</h2>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {[...Array(35)].map((_, i) => {
              const isLogged = Math.random() > 0.3
              const day = i + 1
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition ${
                    isLogged
                      ? 'bg-brand-500 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {day <= 31 ? day : ''}
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-4 h-4 rounded bg-brand-500" />
            <span className="text-slate-600">Logged • 24 days this month</span>
          </div>
        </Card>

        {/* Export Button */}
        <div className="flex justify-center pt-4">
          <button className="px-6 py-3 bg-brand-50 text-brand-600 rounded-lg hover:bg-brand-100 transition font-medium flex items-center gap-2">
            <TrendingUp size={18} />
            Export Report
          </button>
        </div>
      </div>
    </AppShell>
  )
}
