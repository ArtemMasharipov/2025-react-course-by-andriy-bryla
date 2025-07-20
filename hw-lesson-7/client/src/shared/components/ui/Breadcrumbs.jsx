export default function Breadcrumbs({ items, className = '' }) {
  return (
    <nav className={`text-sm text-gray-500 mb-6 ${className}`}>
      {items.map((item, idx) => (
        <span key={idx}>
          {idx > 0 && <span className="mx-2">/</span>}
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-800">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
