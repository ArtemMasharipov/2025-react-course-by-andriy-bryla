import { Search } from 'lucide-react'
import { memo } from 'react'

const SearchInput = memo(({ value, onChange, placeholder = "Пошук..." }) => (
  <div className="relative mb-4">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
))

SearchInput.displayName = 'SearchInput'

export default SearchInput
