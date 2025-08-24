export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <h2 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">404</h2>
      <p className="text-sm opacity-70 max-w-md">The page you are looking for was moved, removed, renamed or might have never existed.</p>
      <a href="/" className="text-xs inline-flex items-center px-3 py-1.5 rounded border border-blue-500 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/30 transition">Go to home</a>
    </div>
  );
}
