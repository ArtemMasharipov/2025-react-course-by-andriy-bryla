export const Loading = ({
  size = 'md',
  text = 'Loading...',
  className = '',
  showText = true
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className={`text-center ${className}`}>
      <div className={`inline-block animate-spin rounded-full border-b-2 border-emerald-600 ${sizeClasses[size]}`}></div>
      {showText && (
        <p className="text-emerald-600 mt-2 text-sm">{text}</p>
      )}
    </div>
  )
}
