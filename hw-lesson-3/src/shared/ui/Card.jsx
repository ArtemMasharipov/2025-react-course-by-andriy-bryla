export const Card = ({ children, className = '', ...props }) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 ${className}`}
    {...props}
  >
    {children}
  </div>
)
