import { Link } from 'react-router-dom'
import { ROUTES } from '../router/routes.constants'

const HomePage = () => {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="heading-hero">Welcome to Products App</h1>
        <p className="max-w-prose text-sm text-slate-600">Manage your products and explore posts from JSONPlaceholder API.</p>
      </section>
      <section className="grid gap-6 sm:grid-cols-2">
        <div className="card p-6 flex flex-col gap-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight">Products Management</h2>
            <p className="text-sm text-slate-600">Create, edit, delete and search through your product inventory.</p>
          </div>
            <Link to={ROUTES.PRODUCTS} className="btn self-start">Go to Products →</Link>
        </div>
        <div className="card p-6 flex flex-col gap-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight">External Posts</h2>
            <p className="text-sm text-slate-600">Browse posts from the public JSONPlaceholder API.</p>
          </div>
            <Link to={ROUTES.POSTS} className="btn self-start">View Posts →</Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
