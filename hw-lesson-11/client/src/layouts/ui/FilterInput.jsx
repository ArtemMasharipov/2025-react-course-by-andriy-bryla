import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsThunk } from '../../entities/product/model/thunks'
import { selectProductFilterTerm, setFilterTerm } from '../../features/product-filter/model/slice'
import { useDebounce } from '../../shared/lib/hooks/useDebounce'

export const FilterInput = () => {
  const dispatch = useDispatch()
  const term = useSelector(selectProductFilterTerm)
  const [localValue, setLocalValue] = useState(term)

  // Debounced search execution
  const executeSearch = useCallback((searchTerm) => {
    dispatch(setFilterTerm(searchTerm))
    dispatch(fetchProductsThunk(searchTerm))
  }, [dispatch])

  useDebounce(executeSearch, localValue, 400)

  return (
    <div className="mb-6 max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={localValue}
          onChange={e => setLocalValue(e.target.value)}
          className="input pr-10"
        />
        {localValue && (
          <button
            type="button"
            onClick={() => setLocalValue('')}
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
