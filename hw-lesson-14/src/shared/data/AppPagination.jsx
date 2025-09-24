import AppButton from '../ui/AppButton'

export default function AppPagination({ 
  hasNext = false, 
  hasPrev = false, 
  onNext, 
  onPrev, 
  currentPage = 1,
  loading = false
}) {
  if (!hasNext && !hasPrev) return null

  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      <AppButton
        variant="ghost"
        onClick={onPrev}
        disabled={!hasPrev || loading}
        size="md"
        className={`
          ${!hasPrev ? 'opacity-40' : 'hover:bg-blue-50 hover:text-blue-700'}
          flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
        `}
      >
        <span className="text-lg">←</span>
        Previous
      </AppButton>
      
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl font-semibold text-sm">
          Page {currentPage}
        </div>
      </div>
      
      <AppButton
        variant="ghost"
        onClick={onNext}
        disabled={!hasNext || loading}
        size="md"
        className={`
          ${!hasNext ? 'opacity-40' : 'hover:bg-blue-50 hover:text-blue-700'}
          flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
        `}
      >
        Next
        <span className="text-lg">→</span>
      </AppButton>
    </div>
  )
}
