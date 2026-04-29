import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function DeficiencyBarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-slate-400">
        No data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="nutrient" type="category" width={100} />
        <Tooltip />
        <Legend />
        <Bar dataKey="deficiency" fill="#E74C3C" name="Deficiency %" />
      </BarChart>
    </ResponsiveContainer>
  )
}
