import { Link, useMatches } from 'react-router-dom'

const Breadcrumb = () => {
  const matches = useMatches()

  // Filter only routes that have a breadcrumb handle
  const crumbs = matches
    .filter(m => m.handle && m.handle.breadcrumb)
    .map((m, idx, arr) => {
      const raw = m.handle.breadcrumb
      const label = typeof raw === 'function' ? raw(m) : raw
      return {
        label,
        path: m.pathname || m.pathnameBase || m.id || '#',
        isLast: idx === arr.length - 1,
      }
    })

  if (crumbs.length <= 1) return null

  return (
    <nav className="mb-4 text-sm" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-slate-500">
        {crumbs.map((c, i) => (
          <li key={c.path} className="flex items-center">
            {i > 0 && <span className="mx-1 select-none opacity-60">/</span>}
            {c.isLast ? (
              <span className="font-medium text-slate-800" aria-current="page">{c.label}</span>
            ) : (
              <Link className="link" to={c.path}>{c.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
