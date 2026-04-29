import { useState, useEffect } from 'react'
import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import DeficiencyBarChart from '../../components/charts/DeficiencyBarChart'
import { AlertTriangle, Users, TrendingUp, Bell, Zap } from 'lucide-react'
import { useSyncAdmin, useSyncListener } from '../../hooks/useSync'

export default function AdminDashboardPage() {
  const { userActivityFeed, trackedUsers } = useSyncAdmin()
  const [stats, setStats] = useState({
    totalUsers: 1240,
    activeToday: 342,
    criticalCases: 47,
    interventionsSent: 189,
  })

  const [recentAlerts, setRecentAlerts] = useState([
    { id: 1, user: 'Rahul Kumar', nutrient: 'Vitamin D', severity: 'critical', date: '2 hours ago' },
    { id: 2, user: 'Priya Singh', nutrient: 'Iron', severity: 'moderate', date: '4 hours ago' },
    { id: 3, user: 'Arjun Patel', nutrient: 'Calcium', severity: 'critical', date: '1 day ago' },
  ])

  const populationDeficiencies = [
    { nutrient: 'Vitamin D', deficiency: 45 },
    { nutrient: 'Calcium', deficiency: 32 },
    { nutrient: 'Iron', deficiency: 28 },
    { nutrient: 'Zinc', deficiency: 18 },
  ]

  const atRiskUsers = [
    { id: 1, name: 'Rahul Kumar', age: 14, deficiency: 'Vitamin D', lastActive: '2 hours ago' },
    { id: 2, name: 'Priya Singh', age: 16, deficiency: 'Iron', lastActive: '4 hours ago' },
    { id: 3, name: 'Arjun Patel', age: 12, deficiency: 'Calcium', lastActive: '1 day ago' },
  ]

  // Listen for real-time meal updates from users
  useEffect(() => {
    if (userActivityFeed.length > 0) {
      const latestActivity = userActivityFeed[0]
      
      if (latestActivity.type === 'meal_logged') {
        // Update active today count
        setStats(prev => ({
          ...prev,
          activeToday: Math.min(prev.activeToday + 1, 1240),
        }))

        // Add to recent alerts if deficiencies detected
        if (latestActivity.data?.deficiencies?.length > 0) {
          const newAlerts = latestActivity.data.deficiencies.map((def, idx) => ({
            id: Date.now() + idx,
            user: `User ${latestActivity.userId}`,
            nutrient: def.nutrient,
            severity: def.severity,
            date: 'just now',
          }))
          setRecentAlerts(prev => [...newAlerts, ...prev].slice(0, 10))
        }
      }

      if (latestActivity.type === 'deficiency_detected') {
        setStats(prev => ({
          ...prev,
          criticalCases: latestActivity.data?.severity === 'critical' 
            ? prev.criticalCases + 1 
            : prev.criticalCases,
        }))

        const newAlert = {
          id: Date.now(),
          user: `User ${latestActivity.userId}`,
          nutrient: latestActivity.data?.nutrient,
          severity: latestActivity.data?.severity,
          date: 'just now',
        }
        setRecentAlerts(prev => [newAlert, ...prev].slice(0, 10))
      }
    }
  }, [userActivityFeed])

  const statsArray = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Today', value: stats.activeToday, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
    { label: 'Critical Cases', value: stats.criticalCases, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
    { label: 'Interventions Sent', value: stats.interventionsSent, icon: Bell, color: 'bg-amber-50 text-amber-600' },
  ]

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="font-display font-semibold text-3xl text-slate-900">
          Admin Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsArray.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Recent Alerts */}
        <Card>
          <h2 className="font-semibold text-slate-900 mb-4">Recent Deficiency Alerts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-600 font-medium">User</th>
                  <th className="text-left py-2 text-slate-600 font-medium">Nutrient</th>
                  <th className="text-left py-2 text-slate-600 font-medium">Severity</th>
                  <th className="text-left py-2 text-slate-600 font-medium">Date</th>
                  <th className="text-left py-2 text-slate-600 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentAlerts.map((alert) => (
                  <tr key={alert.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 font-medium text-slate-900">{alert.user}</td>
                    <td className="py-3 text-slate-700">{alert.nutrient}</td>
                    <td className="py-3">
                      <Badge variant={alert.severity === 'critical' ? 'danger' : 'warning'}>
                        {alert.severity}
                      </Badge>
                    </td>
                    <td className="py-3 text-slate-600">{alert.date}</td>
                    <td className="py-3">
                      <Button size="sm" variant="secondary">
                        Send Intervention
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Population Deficiencies */}
        <Card>
          <h2 className="font-semibold text-slate-900 mb-4">Population Deficiency Rates</h2>
          <DeficiencyBarChart data={populationDeficiencies} />
        </Card>

        {/* At-Risk Users */}
        <Card>
          <h2 className="font-semibold text-slate-900 mb-4">Top Users Needing Intervention</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-600 font-medium">Name</th>
                  <th className="text-left py-2 text-slate-600 font-medium">Age</th>
                  <th className="text-left py-2 text-slate-600 font-medium">Critical Deficiency</th>
                  <th className="text-left py-2 text-slate-600 font-medium">Last Active</th>
                  <th className="text-left py-2 text-slate-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {atRiskUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 font-medium text-slate-900">{user.name}</td>
                    <td className="py-3 text-slate-700">{user.age}</td>
                    <td className="py-3 text-slate-700">{user.deficiency}</td>
                    <td className="py-3 text-slate-600">{user.lastActive}</td>
                    <td className="py-3 flex gap-2">
                      <Button size="sm" variant="secondary">
                        View Details
                      </Button>
                      <Button size="sm">Send Alert</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
