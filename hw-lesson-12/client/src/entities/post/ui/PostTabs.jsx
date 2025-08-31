export const PostTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => onTabChange('pagination')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === 'pagination'
            ? 'bg-white text-emerald-700 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Pagination
      </button>
      <button
        onClick={() => onTabChange('infinite')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === 'infinite'
            ? 'bg-white text-emerald-700 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Infinite Scroll
      </button>
    </div>
  )
}
