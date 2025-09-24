export const LoadingSpinner = ({ text, className = '' }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
    <span className="text-gray-600">{text}</span>
  </div>
)
