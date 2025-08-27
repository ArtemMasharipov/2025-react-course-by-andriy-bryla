import { useCallback, useDeferredValue, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearFilterTerm, selectProductFilterTerm, setFilterTerm } from '../model/slice'

export const FilterInput = () => {
  const dispatch = useDispatch()
  const term = useSelector(selectProductFilterTerm)
  const [localValue, setLocalValue] = useState(term)
  const deferredValue = useDeferredValue(localValue)

  useEffect(() => {
    if (deferredValue === term) return
    dispatch(setFilterTerm(deferredValue))
  }, [deferredValue, term, dispatch])

  const handleClear = useCallback(() => {
    setLocalValue('')
    dispatch(clearFilterTerm())
  }, [dispatch])

  const handleChange = useCallback((e) => {
    setLocalValue(e.target.value)
  }, [])

  return (
    <div className="mb-6 max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={localValue}
          onChange={handleChange}
          className="input pr-10"
        />
        {localValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-lg text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}
