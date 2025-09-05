import { useLocation, useMatches, useNavigate } from 'react-router-dom'

export const Breadcrumbs = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const matches = useMatches()

  if (pathname === '/') return null

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    ...matches
      .filter(({ handle, pathname: matchPath }) => handle?.breadcrumb && matchPath !== '/')
      .map(({ handle, pathname: matchPath }) => ({
        name: handle.breadcrumb,
        path: matchPath
      }))
  ]

  const BreadcrumbItem = ({ crumb, isLast, index }) => (
    <li className="flex items-center">
      {index > 0 && <span className="mx-2 text-gray-400" aria-hidden="true">›</span>}
      {isLast ? (
        <span className="text-gray-900 font-medium" aria-current="page">
          {crumb.name}
        </span>
      ) : (
        <button
          onClick={() => navigate(crumb.path)}
          className="text-gray-600 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
        >
          {crumb.name}
        </button>
      )}
    </li>
  )

  return (
    <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 py-3">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem
            key={crumb.path}
            crumb={crumb}
            index={index}
            isLast={index === breadcrumbs.length - 1}
          />
        ))}
      </ol>
    </nav>
  )
}
