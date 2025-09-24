/**
 * Компонент спиннера загрузки
 */
export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  className = '' 
}) {
  const sizes = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  }
  
  const variants = {
    default: 'border-gray-300 border-t-blue-600',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-300 border-t-gray-600',
    blue: 'border-blue-200 border-t-blue-600'
  }
  
  return (
    <div 
      className={`animate-spin rounded-full border-2 ${variants[variant]} ${sizes[size]} ${className}`} 
      role="status"
      aria-label="Loading"
    />
  )
}

export default LoadingSpinner
