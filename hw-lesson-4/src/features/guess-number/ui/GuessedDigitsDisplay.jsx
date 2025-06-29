export default function GuessedDigitsDisplay({ digits }) {
  const displayText = digits.length > 0 ? digits.join(' ') : '— — —'

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <div className="text-sm text-gray-600 mb-2">Вгадані цифри:</div>
      <div className="text-xl sm:text-2xl font-bold">
        {displayText}
      </div>
    </div>
  )
}
