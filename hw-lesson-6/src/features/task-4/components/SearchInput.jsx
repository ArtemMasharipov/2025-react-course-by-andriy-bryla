import { SEARCH_LABELS } from '../constants'

export default function SearchInput({ value, onChange, onClear }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={SEARCH_LABELS.PLACEHOLDER}
        className="w-full px-4 py-2 border rounded focus:outline-none"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
        >
          ×
        </button>
      )}
    </div>
  )
}
