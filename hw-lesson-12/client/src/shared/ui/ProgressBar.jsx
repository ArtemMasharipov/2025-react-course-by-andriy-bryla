export const ProgressBar = ({ isLoading, className = "" }) => {
  if (!isLoading) return null

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="h-1 bg-emerald-600 animate-pulse">
        <div className="h-full bg-emerald-400 animate-ping"></div>
      </div>
    </div>
  )
}
