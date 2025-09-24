import { Link } from 'react-router-dom'

const homeCards = [
  {
    to: '/patients',
    title: 'Patients',
    description: 'Manage patient records and information',
    color: 'blue',
    icon: '👥'
  },
  {
    to: '/doctors',
    title: 'Doctors',
    description: 'Manage doctor profiles and specialties',
    color: 'green',
    icon: '👨‍⚕️'
  },
  {
    to: '/appointments',
    title: 'Appointments',
    description: 'Schedule and manage appointments',
    color: 'purple',
    icon: '📅'
  }
]

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to EMR Demo</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Electronic Medical Records system demonstration with React, RTK Query, and Firestore.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {homeCards.map(({ to, title, description, color, icon }) => (
          <Link key={to} to={to} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="text-center">
              <div className={`w-16 h-16 bg-${color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl">{icon}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
