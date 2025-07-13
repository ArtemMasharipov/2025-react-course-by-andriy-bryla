import { useMemo, useState } from 'react'
import { INPUT_PLACEHOLDERS } from '../constants'
import Counter from './Counter'
import NumberInput from './NumberInput'
import ResultDisplay from './ResultDisplay'

function Calculator() {
  const [numberA, setNumberA] = useState('')
  const [numberB, setNumberB] = useState('')

  const sum = useMemo(() => {
    return numberA + numberB
  }, [numberA, numberB])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberInput
          label="Число A"
          value={numberA}
          onChange={setNumberA}
          placeholder={INPUT_PLACEHOLDERS.numberA}
        />
        <NumberInput
          label="Число B"
          value={numberB}
          onChange={setNumberB}
          placeholder={INPUT_PLACEHOLDERS.numberB}
        />
      </div>

      <ResultDisplay result={sum} />

      <Counter />
    </div>
  )
}

export default Calculator
