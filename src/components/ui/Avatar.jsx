import { getInitials } from '../../utils/formatters'

const colors = [
  'bg-brand-500',
  'bg-brand-600',
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
]

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

export default function Avatar({ name, src, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover ${sizeClasses[size]}`}
      />
    )
  }

  const initials = getInitials(name)
  const colorIndex = hashCode(name) % colors.length
  const bgColor = colors[colorIndex]

  return (
    <div
      className={`rounded-full flex items-center justify-center font-medium text-white ${bgColor} ${sizeClasses[size]}`}
    >
      {initials}
    </div>
  )
}
