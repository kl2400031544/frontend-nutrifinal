import Card from '../ui/Card'
import Badge from '../ui/Badge'
import ProgressBar from '../ui/ProgressBar'
import { formatNutrient } from '../../utils/formatters'
import { NUTRIENT_COLORS } from '../../constants/nutrients'

export default function NutrientCard({ nutrient, current, rda, unit }) {
  const percent = rda > 0 ? (current / rda) * 100 : 0

  let severity = 'normal'
  if (percent < 50) severity = 'danger'
  else if (percent < 70) severity = 'warning'
  else if (percent < 100) severity = 'mild'

  const severityVariant = {
    danger: 'danger',
    warning: 'warning',
    mild: 'success',
    normal: 'success',
  }

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-slate-900">{nutrient}</h3>
        <Badge variant={severityVariant[severity]}>
          {Math.round(percent)}%
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">
            {formatNutrient(current, nutrient)} / {formatNutrient(rda, nutrient)}
          </span>
        </div>

        <ProgressBar
          value={current}
          max={rda}
          colorAuto={true}
        />
      </div>
    </Card>
  )
}
