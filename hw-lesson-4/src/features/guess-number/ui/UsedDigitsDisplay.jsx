import Chip from './Chip'

export default function UsedDigitsDisplay({ digits }) {
  return (
    <div>
      <div className="text-xs sm:text-sm text-gray-600 mb-2">Використані цифри:</div>
      <div className="flex gap-2 justify-center flex-wrap">
        {digits.map(digit => (
          <Chip key={digit}>
            {digit}
          </Chip>
        ))}
      </div>
    </div>
  )
}
