import { useLocation, useMatches, useNavigate } from 'react-router-dom'

export const Breadcrumbs = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const matches = useMatches()

  if (pathname === '/') return null

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    ...matches
      .filter(match => match.handle?.breadcrumb && match.pathname !== '/')
      .map(match => ({
        name: match.handle.breadcrumb,
        path: match.pathname
      }))
  ]

  return (
    <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 py-3">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">›</span>}
              {isLast ? (
                <span className="text-gray-900 font-medium">{crumb.name}</span>
              ) : (
                <button
                  onClick={() => navigate(crumb.path)}
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  {crumb.name}
                </button>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
