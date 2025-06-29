import { Button } from '../../../shared'

export default function DigitSelector({ availableDigits, onDigitClick }) {
  return (
    <div>
      <div className="text-sm text-gray-600 mb-3">Оберіть цифру:</div>
      <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
        {availableDigits.map(digit => (
          <Button
            key={digit}
            onClick={() => onDigitClick(digit)}
            variant="outline"
            className="aspect-square text-sm sm:text-base"
          >
            {digit}
          </Button>
        ))}
      </div>
    </div>
  )
}
