export default function SearchInput({ 
  value = '',
  onChange,
  placeholder = 'Search...', 
  className = ''
}) {
  const handleChange = (e) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-400">🔍</span>
      </div>
    </div>
  )
}
