import { NUTRIENT_UNITS } from '../constants/nutrients'

export const formatNutrient = (value, nutrient) => {
  const unit = NUTRIENT_UNITS[nutrient] || ''
  return `${value.toFixed(1)} ${unit}`
}

export const formatCalories = (kcal) => {
  return `${kcal.toLocaleString()} kcal`
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export const formatRelativeTime = (date) => {
  const now = new Date()
  const diff = now - new Date(date)
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`
  return formatDate(date)
}

export const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export const getSeverityColor = (severity) => {
  switch (severity) {
    case 'critical':
      return 'text-rose-600 bg-rose-50'
    case 'moderate':
      return 'text-amber-600 bg-amber-50'
    case 'mild':
      return 'text-brand-600 bg-brand-50'
    default:
      return 'text-slate-600 bg-slate-50'
  }
}

export const getSeverityTextColor = (severity) => {
  switch (severity) {
    case 'critical':
      return 'text-rose-600'
    case 'moderate':
      return 'text-amber-600'
    case 'mild':
      return 'text-brand-600'
    default:
      return 'text-slate-600'
  }
}

export const calculateBMI = (weight, height) => {
  const heightM = height / 100
  return (weight / (heightM * heightM)).toFixed(1)
}
