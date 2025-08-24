import { useCallback, useEffect, useRef, useState } from 'react'

// Minimal generic persistent state hook (stringify / parse JSON)
export function useLocalStorageState(key, initialValue) {
  const isFirst = useRef(true)
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw == null) return initialValue
      return JSON.parse(raw)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {
      /* ignore quota errors */
    }
  }, [key, state])

  const reset = useCallback(() => setState(initialValue), [initialValue])

  return [state, setState, reset]
}

export default useLocalStorageState
