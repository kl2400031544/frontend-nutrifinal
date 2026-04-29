import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function NutrientRadarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-slate-400">
        No data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nutrient" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="current" fill="#0E9254" name="Current" />
        <Bar dataKey="rda" fill="#CBD5E1" name="RDA" />
      </BarChart>
    </ResponsiveContainer>
  )
}
