export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}) {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}
