/**
 * Универсальный компонент карточки
 * Объединяет ContentCard и другие card-подобные компоненты
 */
export default function AppCard({ 
  children, 
  className = '',
  padding = 'md',
  shadow = 'md',
  border = true 
}) {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-lg',
    lg: 'shadow-xl'
  }
  
  const baseClasses = 'card-lime rounded-2xl'
  const borderClass = border ? '' : 'border-0'
  
  const classes = `${baseClasses} ${paddings[padding]} ${shadows[shadow]} ${borderClass} ${className}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

// Удалены неиспользуемые экспорты: PageCard, ListCard
