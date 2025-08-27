const Loader = ({ size = 32, className = '' }) => {
  const px = typeof size === 'number' ? `${size}px` : size
  return (
    <div className={`flex items-center justify-center ${className}`} aria-label="Loading">
      <div
        className="animate-spin rounded-full border-4 border-slate-300 border-t-slate-600"
        style={{ width: px, height: px }}
      />
    </div>
  )
}

export default Loader
