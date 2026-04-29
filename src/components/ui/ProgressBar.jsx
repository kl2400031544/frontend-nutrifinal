import clsx from 'clsx'

export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  showPercent = true,
  colorAuto = true,
}) {
  const percent = Math.min((value / max) * 100, 100)
  
  let color = 'bg-brand-500'
  if (colorAuto) {
    if (percent >= 70) {
      color = 'bg-brand-500'
    } else if (percent >= 50) {
      color = 'bg-amber-500'
    } else {
      color = 'bg-rose-500'
    }
  }

  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-slate-700">{label}</label>
          {showPercent && (
            <span className="text-sm font-medium text-slate-600">
              {Math.round(percent)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={clsx(
            'h-full transition-all duration-500 ease-out',
            color
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
