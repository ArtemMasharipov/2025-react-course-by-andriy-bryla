import { useEffect, useState } from 'react'
import { MOCK_COUNTRIES, SEARCH_CONFIG } from '../constants'
import useDebounce from '../hooks/useDebounce'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

export default function DebouncedSearchTask4() {
  const [term, setTerm]       = useState('')
  const [results, setResults] = useState([])
  const debouncedTerm         = useDebounce(term, SEARCH_CONFIG.DEBOUNCE_DELAY)

  const isTooShort  = term.length > 0 && term.length < SEARCH_CONFIG.MIN_SEARCH_LENGTH
  const isSearching = term.length >= SEARCH_CONFIG.MIN_SEARCH_LENGTH && debouncedTerm !== term
  const hasSearched = debouncedTerm.length >= SEARCH_CONFIG.MIN_SEARCH_LENGTH

  useEffect(() => {
    if (term.length === 0) {
      setResults([])
      return
    }

    if (hasSearched) {
      const q = debouncedTerm.toLowerCase()
      setResults(MOCK_COUNTRIES.filter(c => c.toLowerCase().includes(q)))
    } else {
      setResults([])
    }
  }, [debouncedTerm, hasSearched, term.length])

  return (
    <div className="space-y-4 max-w-md mx-auto p-4 bg-white rounded shadow">
      <SearchInput
        value={term}
        onChange={e => setTerm(e.target.value)}
        onClear={() => setTerm('')}
      />

      <SearchResults
        results={results}
        isTooShort={isTooShort}
        isSearching={isSearching}
        hasSearched={hasSearched}
        isEmpty={term.length === 0}
      />
    </div>
  )
}
