
export default function AboutPage() {
  return (
    <section className="space-y-8 max-w-3xl">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Про додаток</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Навчальний MERN-додаток для керування викладачами, їх предметами та формування зборів. Використано стек <code className="font-mono text-[13px] bg-green-50 px-1 py-0.5 rounded">MongoDB · Express · React · Node.js</code> з сучасним фронтендом на <code className="font-mono text-[13px] bg-green-50 px-1 py-0.5 rounded">Vite</code> і стилізацією через <code className="font-mono text-[13px] bg-green-50 px-1 py-0.5 rounded">Tailwind CSS</code>.
        </p>
      </header>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-800">Особливості</h2>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
          <li className="rounded-md border border-green-100 bg-white px-3 py-2">Мінімалістична архітектура</li>
          <li className="rounded-md border border-green-100 bg-white px-3 py-2">CRUD + призначення на збори</li>
          <li className="rounded-md border border-green-100 bg-white px-3 py-2">Перевірка даних & статичні предмети</li>
          <li className="rounded-md border border-green-100 bg-white px-3 py-2">Feature-first структура та навігація</li>
        </ul>
      </div>
    </section>
  )
}
