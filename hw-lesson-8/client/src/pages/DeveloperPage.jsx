
export default function DeveloperPage() {
  return (
    <section className="space-y-8 max-w-3xl">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Про розробника</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          <span className="font-medium text-green-700">Artem Masharipov</span> — автор та розробник навчального MERN-додатку.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-green-100 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Контакти</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Email:{' '}
            <a href="mailto:andriy.bryla@example.com" className="text-green-700 hover:underline">example@example.com</a><br />
            Рік: 2025
          </p>
        </div>
        <div className="rounded-lg border border-green-100 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Технології</h3>
          <p className="text-xs text-slate-600 leading-relaxed">MongoDB · Express · React · Node.js · Vite · Tailwind</p>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-800">Контекст</h2>
        <ul className="text-sm text-slate-700 grid gap-2 sm:grid-cols-2">
          <li className="rounded-md border border-green-100 bg-white px-3 py-2">Освітній проект</li>
          <li className="rounded-md border border-green-100 bg-white px-3 py-2">Сучасний стек</li>
          <li className="rounded-md border border-green-100 bg-white px-3 py-2">Мінімалізм & чистота</li>
          <li className="rounded-md border border-green-100 bg-white px-3 py-2">UX-дружній інтерфейс</li>
        </ul>
      </div>
    </section>
  )
}
