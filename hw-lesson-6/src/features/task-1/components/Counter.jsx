import { useState } from 'react'

function Counter() {
  const [counter, setCounter] = useState(0)

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setCounter((prevCounter) => prevCounter + 1)}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Increase counter
      </button>
      <div className="text-lg font-medium">Counter: {counter}</div>
    </div>
  )
}

export default Counter
