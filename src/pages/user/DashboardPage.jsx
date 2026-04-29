import { useState, useEffect } from 'react'
import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import DeficiencyAlert from '../../components/shared/DeficiencyAlert'
import WeeklyTrendChart from '../../components/charts/WeeklyTrendChart'
import { formatDate, formatCalories } from '../../utils/formatters'
import { Plus, AlertCircle, CheckCircle } from 'lucide-react'
import { useSync, useSyncListener } from '../../hooks/useSync'

export default function DashboardPage() {
  const { unreadNotifications, newNotification } = useSync()
  
  const [metrics, setMetrics] = useState({
    dailyCalories: { current: 1450, goal: 2000 },
    mealsLogged: 3,
    deficiencies: 2,
    streak: 15,
  })

  const [todaysMeals, setTodaysMeals] = useState([
    { id: 1, name: 'Breakfast', foods: ['Milk', 'Cereal'], calories: 350, time: '08:00' },
    { id: 2, name: 'Lunch', foods: ['Rice', 'Dal', 'Vegetables'], calories: 650, time: '13:00' },
    { id: 3, name: 'Snack', foods: ['Apple', 'Peanut Butter'], calories: 220, time: '16:30' },
  ])

  const [weeklyTrend, setWeeklyTrend] = useState([
    { date: 'Mon', Iron: 85, Calcium: 92, 'Vitamin D': 45 },
    { date: 'Tue', Iron: 78, Calcium: 88, 'Vitamin D': 50 },
    { date: 'Wed', Iron: 95, Calcium: 105, 'Vitamin D': 55 },
    { date: 'Thu', Iron: 72, Calcium: 80, 'Vitamin D': 40 },
    { date: 'Fri', Iron: 88, Calcium: 98, 'Vitamin D': 60 },
    { date: 'Sat', Iron: 110, Calcium: 115, 'Vitamin D': 65 },
    { date: 'Sun', Iron: 92, Calcium: 100, 'Vitamin D': 58 },
  ])

  const [deficiencies, setDeficiencies] = useState([
    {
      nutrient: 'Vitamin D',
      currentPercent: 45,
      severity: 'critical',
      gap: 10.5,
      suggestion: 'Include more fortified milk or expose to sunlight.',
    },
    {
      nutrient: 'Iron',
      currentPercent: 72,
      severity: 'mild',
      gap: 2.2,
      suggestion: 'Add spinach or fortified cereals to your diet.',
    },
  ])

  const [interventions, setInterventions] = useState([])

  // Listen for incoming interventions and notifications
  useEffect(() => {
    if (newNotification) {
      if (newNotification.type === 'intervention_received') {
        setInterventions(prev => [newNotification, ...prev])
      }
    }
  }, [newNotification])

  const handleAcknowledgeIntervention = (interventionId) => {
    setInterventions(prev => prev.filter(i => i.id !== interventionId))
  }

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-semibold text-3xl text-slate-900 mb-1">
              Dashboard
            </h1>
            <p className="text-slate-500">{formatDate(new Date())}</p>
          </div>
        </div>

        {/* Interventions Banner */}
        {interventions.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-500" />
              Admin Interventions
            </h2>
            {interventions.map((intervention) => (
              <Card key={intervention.id} className="bg-amber-50 border border-amber-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{intervention.message}</p>
                    {intervention.intervention && (
                      <p className="text-sm text-slate-700 mt-2">{intervention.intervention}</p>
                    )}
                    <p className="text-xs text-slate-500 mt-2">
                      {new Date(intervention.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAcknowledgeIntervention(intervention.id)}
                    className="ml-4"
                  >
                    Got it
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Unread Notifications */}
        {unreadNotifications.length > 0 && (
          <Card className="bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={20} className="text-blue-500" />
              <p className="font-medium text-slate-900">
                {unreadNotifications.length} new notification{unreadNotifications.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="space-y-1">
              {unreadNotifications.slice(0, 3).map((notif) => (
                <p key={notif.id} className="text-sm text-slate-700">
                  • {notif.message || notif.type}
                </p>
              ))}
            </div>
          </Card>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <p className="text-sm font-medium text-slate-600 mb-1">Today's Calories</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-slate-900">
                {metrics.dailyCalories.current}
              </span>
              <span className="text-sm text-slate-500 mb-1">/ {metrics.dailyCalories.goal}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
              <div
                className="bg-brand-500 h-1.5 rounded-full transition-all"
                style={{
                  width: `${(metrics.dailyCalories.current / metrics.dailyCalories.goal) * 100}%`,
                }}
              />
            </div>
          </Card>

          <Card>
            <p className="text-sm font-medium text-slate-600 mb-1">Meals Logged</p>
            <p className="text-2xl font-bold text-slate-900 mb-2">{metrics.mealsLogged}</p>
            <Badge variant="success">On track</Badge>
          </Card>

          <Card>
            <p className="text-sm font-medium text-slate-600 mb-1">Deficiencies</p>
            <p className="text-2xl font-bold text-slate-900 mb-2">{metrics.deficiencies}</p>
            {metrics.deficiencies > 0 && (
              <Badge variant="warning">Attention needed</Badge>
            )}
          </Card>

          <Card>
            <p className="text-sm font-medium text-slate-600 mb-1">Current Streak</p>
            <p className="text-2xl font-bold text-slate-900 mb-2">{metrics.streak}</p>
            <Badge variant="success">{metrics.streak} days 🔥</Badge>
          </Card>
        </div>

        {/* Deficiencies Section */}
        {deficiencies.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-semibold text-slate-900">Nutrient Deficiencies</h2>
            <div className="space-y-2">
              {deficiencies.map((def) => (
                <DeficiencyAlert key={def.nutrient} {...def} />
              ))}
            </div>
          </div>
        )}

        {/* Today's Meals */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Today's Meals</h2>
          </div>
          <div className="grid gap-3">
            {todaysMeals.map((meal) => (
              <Card key={meal.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900">{meal.name}</h3>
                    <p className="text-sm text-slate-500">{meal.foods.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{formatCalories(meal.calories)}</p>
                    <p className="text-xs text-slate-500">{meal.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="space-y-3">
          <h2 className="font-semibold text-slate-900">Weekly Nutrient Trend</h2>
          <Card>
            <WeeklyTrendChart
              data={weeklyTrend}
              nutrients={['Iron', 'Calcium', 'Vitamin D']}
            />
          </Card>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg flex items-center justify-center transition active:scale-95">
        <Plus size={24} />
      </button>
    </AppShell>
  )
}
