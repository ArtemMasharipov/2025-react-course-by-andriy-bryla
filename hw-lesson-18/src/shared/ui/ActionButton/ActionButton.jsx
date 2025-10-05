/**
 * Base action button component
 * 
 * @param {Object} props
 * @param {string} props.variant - style variant (primary, danger, success, warning, secondary, ghost)
 * @param {string} props.size - button size (sm, md, lg)
 * @param {Function} props.onClick - click handler
 * @param {ReactNode} props.children - button content
 * @param {boolean} props.disabled - is button disabled
 * @param {string} props.className - additional CSS classes
 */
export function ActionButton({ 
  variant = 'primary', 
  size = 'sm', 
  onClick, 
  children, 
  disabled = false,
  className = '',
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900 focus:ring-gray-500'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-md',
    md: 'px-4 py-2 text-sm rounded-md',
    lg: 'px-6 py-3 text-base rounded-md'
  }
  
  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer'
  
  const buttonStyles = [
    baseStyles,
    variants[variant],
    sizes[size],
    disabledStyles,
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
