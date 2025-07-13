import { memo, useRef } from 'react'

const ResultDisplay = memo(({ result }) => {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">Результат</h3>
      <div className="text-2xl font-bold text-blue-900">A + B = {result}</div>
      <div className="text-sm text-gray-500 mt-2">Кількість рендерів: {renderCount.current}</div>
    </div>
  )
})

export default ResultDisplay
