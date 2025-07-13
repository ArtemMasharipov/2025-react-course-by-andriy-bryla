import { SEARCH_LABELS } from '../constants'

export default function SearchResults({ results, isTooShort, isSearching, hasSearched, isEmpty }) {
  if (isEmpty) {
    return null
  }

  if (isTooShort) {
    return <div className="text-amber-600">⚠️ {SEARCH_LABELS.MIN_LENGTH_WARNING}</div>
  }
  if (isSearching) {
    return <div className="text-blue-600">{SEARCH_LABELS.SEARCHING}</div>
  }
  if (hasSearched && results.length === 0) {
    return <div className="text-orange-600">{SEARCH_LABELS.NO_RESULTS}</div>
  }
  if (results.length > 0) {
    return (
      <ul className="border rounded max-h-60 overflow-auto mt-2">
        {results.map((c, i) => (
          <li key={i} className="px-4 py-2 hover:bg-gray-100 flex items-center">
            🌍 {c}
          </li>
        ))}
      </ul>
    )
  }
  return null
}
