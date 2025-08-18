export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="space-y-2">
        <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-br from-green-600 to-green-800 bg-clip-text text-transparent">404</h1>
        <p className="text-sm text-slate-600">Сторінку не знайдено або вона була переміщена.</p>
      </div>
      <a href="/" className="inline-flex items-center rounded-md border border-green-500 bg-white px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500">На головну</a>
    </section>
  )
}
