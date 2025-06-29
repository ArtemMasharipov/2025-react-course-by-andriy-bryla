export default function Chip({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-gray-300 text-gray-700',
    success: 'bg-green-200 text-green-800',
    muted: 'text-gray-400'
  }

  const variantClasses = variants[variant] || variants.default

  return (
    <span className={`rounded px-2 py-1 text-xs sm:text-sm ${variantClasses} ${className}`}>
      {children}
    </span>
  )
}
