export default function AppButton({
  children,
  type = 'button',
  onClick,
  disabled,
  variant = 'primary',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1 transition disabled:opacity-60 disabled:cursor-not-allowed'
  const byVariant = {
    primary:
      'bg-green-600 text-white shadow-sm hover:bg-green-700 active:bg-green-800 focus-visible:ring-green-500',
    outline:
      'bg-white text-green-700 border border-green-500 hover:bg-green-50 active:bg-green-100',
    subtle:
      'bg-green-50 text-green-700 hover:bg-green-100 active:bg-green-200 border border-green-100',
    danger:
      'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500',
  }
  const styles = byVariant[variant] || byVariant.primary
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
