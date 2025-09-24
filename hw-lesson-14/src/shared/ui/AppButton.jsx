import { LoadingSpinner } from './LoadingSpinner'

export default function AppButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm active:scale-95'
  
  const variants = {
    primary: 'bg-gradient-to-r from-lime-500 to-lime-600 text-white hover:from-lime-600 hover:to-lime-700 hover:shadow-lg hover:scale-105 focus:ring-lime-500 disabled:from-lime-300 disabled:to-lime-400 disabled:text-lime-100 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-sm',
    secondary: 'bg-gradient-to-r from-lime-100 to-lime-200 text-lime-800 hover:from-lime-200 hover:to-lime-300 hover:shadow-md hover:scale-105 focus:ring-lime-500 disabled:from-lime-50 disabled:to-lime-100 disabled:text-lime-400 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-sm',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:scale-105 focus:ring-red-500 disabled:from-red-300 disabled:to-red-400 disabled:text-red-100 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-sm',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:scale-105 focus:ring-green-500 disabled:from-green-300 disabled:to-green-400 disabled:text-green-100 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-sm',
    ghost: 'bg-transparent text-lime-700 hover:text-lime-900 hover:bg-lime-100 hover:shadow-md hover:scale-105 focus:ring-lime-500 disabled:text-lime-400 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-transparent'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {loading && (
        <LoadingSpinner size="sm" variant="white" />
      )}
      {children}
    </button>
  )
}


export function ActionButton({ action, onClick, disabled, children }) {
  const actionConfig = {
    edit: { 
      variant: 'ghost', 
      className: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 hover:border-blue-300 w-full sm:w-auto' 
    },
    delete: { 
      variant: 'ghost', 
      className: 'text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 hover:border-red-300 w-full sm:w-auto' 
    },
    view: { 
      variant: 'ghost', 
      className: 'text-gray-600 hover:text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 w-full sm:w-auto' 
    }
  }
  
  const config = actionConfig[action] || actionConfig.view
  
  return (
    <AppButton
      variant={config.variant}
      size="sm"
      className={config.className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </AppButton>
  )
}

export function ActionButtons({ entityId, onView, onEdit, onDelete }) {
  const handleView = () => {
    onView(entityId)
  }
  
  const handleEdit = () => {
    onEdit(entityId)
  }
  
  const handleDelete = () => {
    onDelete(entityId)
  }
  
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <ActionButton action="view" onClick={handleView}>
        View
      </ActionButton>
      <ActionButton action="edit" onClick={handleEdit}>
        Edit
      </ActionButton>
      <ActionButton action="delete" onClick={handleDelete}>
        Delete
      </ActionButton>
    </div>
  )
}

export function SortToggleButton({
  label = 'Sort',
  isAscending = true,
  onToggle,
  className = ''
}) {
  const arrowIcon = isAscending ? '↑' : '↓'
  const directionText = isAscending ? 'newest first' : 'oldest first'

  return (
    <AppButton
      variant="secondary"
      size="sm"
      onClick={onToggle}
      className={`flex items-center gap-2 ${className}`}
      title={`Sort by ${label.toLowerCase()} - ${directionText}`}
    >
      <span>{label}</span>
      <span className="text-lg leading-none font-mono">{arrowIcon}</span>
    </AppButton>
  )
}
