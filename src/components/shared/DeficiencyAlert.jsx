import { AlertCircle, AlertTriangle, Info } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { getSeverityTextColor } from '../../utils/formatters'

export default function DeficiencyAlert({
  nutrient,
  currentPercent,
  severity = 'mild',
  gap,
  suggestion,
}) {
  const icons = {
    critical: AlertTriangle,
    moderate: AlertCircle,
    mild: Info,
  }

  const Icon = icons[severity]

  const bgColors = {
    critical: 'bg-rose-50',
    moderate: 'bg-amber-50',
    mild: 'bg-brand-50',
  }

  return (
    <Card className={`${bgColors[severity]}`}>
      <div className="flex gap-3">
        <Icon className={`${getSeverityTextColor(severity)} flex-shrink-0`} size={24} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-slate-900">{nutrient}</h3>
            <Badge variant={severity === 'critical' ? 'danger' : severity === 'moderate' ? 'warning' : 'success'}>
              {currentPercent}% RDA
            </Badge>
          </div>
          <p className="text-sm text-slate-600 mb-2">
            {gap && `Missing ${gap.toFixed(1)}g - `}
            {suggestion}
          </p>
          <button className="text-sm font-medium text-brand-600 hover:text-brand-700">
            View suggestions →
          </button>
        </div>
      </div>
    </Card>
  )
}
