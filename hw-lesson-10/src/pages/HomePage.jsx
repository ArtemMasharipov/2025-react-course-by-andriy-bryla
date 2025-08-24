import { ThemeContext } from '@contexts/ThemeContext.js';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="space-y-6" data-theme={theme}>
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Travel Planner</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-prose">
          Select the bus routes and hotels you need, then view the summary on the Summary page.
          Switch themes and save your selections between reloads.
        </p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/buses"
          className="group rounded-md border border-neutral-200 dark:border-neutral-700 p-4 hover:border-blue-400/70 dark:hover:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-neutral-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/30"
        >
          <h2 className="font-semibold mb-1 flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
            Buses
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">View available routes and add to favorites.</p>
        </Link>
        <Link
          to="/hotels"
          className="group rounded-md border border-neutral-200 dark:border-neutral-700 p-4 hover:border-emerald-400/70 dark:hover:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-neutral-900 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30"
        >
          <h2 className="font-semibold mb-1 flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
            Hotels
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">Choose hotels for your trip.</p>
        </Link>
      </section>
    </div>
  );
}
