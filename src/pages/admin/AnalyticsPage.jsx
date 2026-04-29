import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function AnalyticsPage() {
  const pieData = [
    { name: 'Vegetarian', value: 45 },
    { name: 'Non-Vegetarian', value: 35 },
    { name: 'Vegan', value: 20 },
  ]

  const barData = [
    { nutrient: 'Vitamin D', users: 450 },
    { nutrient: 'Calcium', users: 320 },
    { nutrient: 'Iron', users: 280 },
    { nutrient: 'Zinc', users: 150 },
  ]

  const growthData = [
    { date: 'Week 1', active: 200, total: 250 },
    { date: 'Week 2', active: 280, total: 350 },
    { date: 'Week 3', active: 320, total: 450 },
    { date: 'Week 4', active: 380, total: 620 },
  ]

  const COLORS = ['#0E9254', '#3498DB', '#F39C12']

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="font-display font-semibold text-3xl text-slate-900">Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="font-semibold text-slate-900 mb-4">Dietary Preference Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label outerRadius={80} fill="#8884d8" dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h2 className="font-semibold text-slate-900 mb-4">Most Common Deficiencies</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nutrient" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#0E9254" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card>
          <h2 className="font-semibold text-slate-900 mb-4">User Growth & Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="active" stroke="#0E9254" name="Active Users" />
              <Line type="monotone" dataKey="total" stroke="#CBD5E1" name="Total Users" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </AppShell>
  )
}
