export const ProgressBar = ({
  value = 0,
  max = 100,
  className = '',
  showLabel = true
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={className}>
      <div className="bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-sm text-gray-500 mt-1 text-center">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
}
