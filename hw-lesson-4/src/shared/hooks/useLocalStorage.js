import { useCallback, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setStoredValue = useCallback(
    newValue => {
      setValue(prev => {
        const valueToStore =
          typeof newValue === 'function' ? newValue(prev) : newValue

        try {
          localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch {
          console.error(`Error saving to localStorage with key "${key}"`)
        }

        return valueToStore
      })
    },
    [key]
  )

  return [value, setStoredValue]
}
