import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

const colors = ['#0E9254', '#3498DB', '#F39C12', '#E74C3C']

export default function WeeklyTrendChart({ data, nutrients = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-slate-400">
        No data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={100} stroke="#CBD5E1" strokeDasharray="5 5" name="100% RDA" />
        {nutrients.map((nutrient, idx) => (
          <Line
            key={nutrient}
            type="monotone"
            dataKey={nutrient}
            stroke={colors[idx % colors.length]}
            dot={{ r: 3 }}
            isAnimationActive
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
