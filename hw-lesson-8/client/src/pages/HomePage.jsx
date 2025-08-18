import AppButton from '@/shared/ui/AppButton'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes/routes.constants'

export default function HomePage() {
  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Ласкаво просимо до Додатку &quot;Вчителі&quot;!</h1>
        <p className="text-slate-600 max-w-2xl text-sm leading-relaxed">
          Цей додаток допоможе вам керувати інформацією про вчителів, викликати їх на збори та дізнаватися про розробника
        </p>
      </header>
      <div className="flex flex-wrap gap-4">
        <Link to={ROUTES.TEACHERS}>
          <AppButton>Переглянути вчителів</AppButton>
        </Link>
        <Link to={ROUTES.MEETINGS}>
          <AppButton variant="outline">Переглянути список для зборів</AppButton>
        </Link>
      </div>
    </section>
  )
}
