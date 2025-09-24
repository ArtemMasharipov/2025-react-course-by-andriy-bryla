import AppCard from '../ui/AppCard'
import { LoadingSpinner } from '../ui/LoadingSpinner'

export default function ListWrapper({ 
  items = [], 
  isLoading = false, 
  error = null,
  emptyMessage = 'No items found',
  children,
  itemKey = 'id'
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <LoadingSpinner size="lg" variant="blue" />
            </div>
          </div>
          <p className="text-gray-600 text-base font-medium">Loading...</p>
          <p className="text-gray-500 text-sm">Please wait while we fetch your data</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <AppCard className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-red-600 mb-3 font-medium">{error.message || 'Something went wrong'}</p>
          <p className="text-sm text-gray-500 mb-4">Please try refreshing the page or contact support if the problem persists.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span>🔄</span>
            Retry
          </button>
        </AppCard>
      </div>
    )
  }
  
  if (!items.length) {
    return (
      <div className="flex items-center justify-center py-16">
        <AppCard className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-2xl">📋</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Items Found</h3>
          <p className="text-gray-500">{emptyMessage}</p>
        </AppCard>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AppCard 
          key={item[itemKey] || index} 
          className=""
          padding="lg"
        >
          {children(item)}
        </AppCard>
      ))}
    </div>
  )
}
