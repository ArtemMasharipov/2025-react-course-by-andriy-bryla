export const PageBoundaryBadge = ({ pageNumber, className = "" }) => {
  return (
    <div className={`flex justify-center py-4 ${className}`}>
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
        <span className="mr-2">📄</span>
        End of page {pageNumber}
      </div>
    </div>
  )
}
