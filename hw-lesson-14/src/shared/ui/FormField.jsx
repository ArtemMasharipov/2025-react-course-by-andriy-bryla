/**
 * Универсальный компонент поля формы
 * Объединяет FormInput, FormSelect
 */
export default function FormField({ 
  type = 'text',
  label, 
  error, 
  options = [],
  placeholder,
  className = '',
  required = false,
  ...props 
}) {
  const fieldClasses = `
    w-full px-4 py-3 border-2 rounded-xl transition-all duration-200
    bg-lime-50/50 hover:bg-white focus:bg-white
    text-gray-900 placeholder:text-gray-500
    focus:ring-2 focus:ring-lime-500 focus:border-lime-500 focus:outline-none
    disabled:bg-lime-100 disabled:cursor-not-allowed disabled:text-gray-500
    ${error 
      ? 'border-red-400 bg-red-50 hover:bg-red-50 focus:bg-red-50 focus:border-red-500 focus:ring-red-500' 
      : 'border-lime-300 hover:border-lime-400 focus:border-lime-500'
    }
  `

  const renderField = () => {
    if (type === 'select') {
      return (
        <select className={fieldClasses} {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
    }
    
    if (type === 'textarea') {
      return (
        <textarea 
          className={`${fieldClasses} resize-none min-h-[100px]`}
          rows={4}
          placeholder={placeholder}
          {...props}
        />
      )
    }
    
    return (
      <input
        type={type}
        className={fieldClasses}
        placeholder={placeholder}
        {...props}
      />
    )
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {renderField()}
        {error && (
          <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-600 text-sm font-medium">
            <span className="text-xs">⚠</span>
            {error}
          </div>
        )}
      </div>
      {error && <div className="h-6"></div>} {/* Spacer for error message */}
    </div>
  )
}
