import { Link } from 'react-router-dom'

export default function BackButton({ to, children = 'Back' }) {
  return (
    <div className="mb-4">
      <Link
        to={to}
        className="text-lime-600 hover:text-lime-800 inline-flex items-center text-sm font-medium"
      >
        <span className="mr-1">←</span>
        {children}
      </Link>
    </div>
  )
}
