import { Link, useMatches } from 'react-router-dom';

export default function Breadcrumbs() {
  const matches = useMatches();

  const crumbs = matches
    .filter(m => m.handle && m.handle.crumb)
    .filter((m, idx, arr) => idx === arr.findIndex(x => x.handle.crumb === m.handle.crumb))
    .map(m => ({
      pathname: m.pathname || '/',
      label: m.handle.crumb,
      isLast: false,
    }));
  if (crumbs.length <= 1) return null;
  crumbs[crumbs.length - 1].isLast = true;

  return (
    <nav aria-label="Breadcrumb" className="text-xs mb-4" data-testid="breadcrumbs">
      <ol className="flex flex-wrap items-center gap-1 text-neutral-500 dark:text-neutral-400">
        {crumbs.map(c => (
          <li key={c.pathname} className="flex items-center gap-1">
            {c.isLast ? (
              <span className="font-semibold text-neutral-700 dark:text-neutral-200">{c.label}</span>
            ) : (
              <Link to={c.pathname} className="hover:text-neutral-800 dark:hover:text-neutral-100 transition">
                {c.label}
              </Link>
            )}
            {!c.isLast && <span className="opacity-40 select-none">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
