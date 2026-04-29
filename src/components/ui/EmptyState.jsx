import { AlertCircle } from 'lucide-react'
import Button from './Button'

export default function EmptyState({
  icon: Icon = AlertCircle,
  title,
  description,
  action,
  actionLabel = 'Try again',
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Icon size={48} className="text-slate-300 mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-500 text-sm mb-6 max-w-sm">{description}</p>
      {action && (
        <Button variant="secondary" size="sm" onClick={action}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
