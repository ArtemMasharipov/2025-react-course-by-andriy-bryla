export default function DigitsDisplay({
  title,
  digits,
  type = 'default',
  variant = 'default'
}) {
  const getChipClass = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'muted':
        return 'bg-gray-100 text-gray-600'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  if (type === 'large') {
    const displayText = digits.length > 0 ? digits.join(' ') : '— — —'
    return (
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-sm text-gray-600 mb-2">{title}</div>
        <div className="text-xl sm:text-2xl font-bold">
          {displayText}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-xs sm:text-sm text-gray-600 mb-2">{title}</div>
      <div className="flex gap-2 justify-center flex-wrap">
        {digits.length === 0 ? (
          <span className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-full text-sm font-medium ${getChipClass()}`}>
            немає
          </span>
        ) : (
          digits.map(digit => (
            <span
              key={digit}
              className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-full text-sm font-medium ${getChipClass()}`}
            >
              {digit}
            </span>
          ))
        )}
      </div>
    </div>
  )
}
