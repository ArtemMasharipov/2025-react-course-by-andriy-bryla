export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-4 sm:p-6 transition-shadow duration-200 hover:shadow-xl ${className}`}>
      {children}
    </div>
  )
}
