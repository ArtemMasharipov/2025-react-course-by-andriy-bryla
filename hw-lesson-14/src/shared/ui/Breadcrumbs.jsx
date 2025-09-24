import { Link, useMatches } from 'react-router-dom'

/**
 * Хлебные крошки
 */
export function Breadcrumbs() {
  const matches = useMatches()
  
  if (matches.length <= 1) return null

  const trail = [
    { key: 'home', to: '/', label: 'Home' },
    ...matches
      .filter(m => m.handle?.breadcrumb && m.pathname !== '/')
      .map(m => ({
        key: m.id,
        to: m.pathname,
        label: typeof m.handle.breadcrumb === 'function' 
          ? m.handle.breadcrumb({ params: m.params })
          : m.handle.breadcrumb
      }))
  ]

  if (trail.length <= 1) return null

  return (
    <nav className="mb-4 text-sm text-lime-700">
      {trail.map((item, i) => (
        <span key={item.key}>
          {i === trail.length - 1 ? (
            <span className="text-lime-900 font-medium">{item.label}</span>
          ) : (
            <>
              <Link to={item.to} className="text-lime-600 hover:text-lime-800">
                {item.label}
              </Link>
              <span className="mx-2">›</span>
            </>
          )}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumbs
