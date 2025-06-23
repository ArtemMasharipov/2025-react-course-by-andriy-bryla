export const Alert = ({
  type = 'info',
  children,
  className = '',
  ...props
}) => {  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800 shadow-sm',
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700'
  }

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  }

  return (
    <div
      className={`border rounded-lg p-4 mb-4 ${styles[type]} ${className}`}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span>{icons[type]}</span>
        <div>{children}</div>
      </div>
    </div>
  )
}
