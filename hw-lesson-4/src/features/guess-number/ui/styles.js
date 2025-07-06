export const getPlayerCardClasses = isActive => ({
  card: `p-4 rounded-lg border-2 transition-all duration-300 ${
    isActive
      ? 'bg-blue-50 border-blue-400 shadow-lg transform scale-105'
      : 'bg-gray-50 border-gray-200'
  }`,
  title: `font-semibold text-sm sm:text-base ${
    isActive ? 'text-blue-800' : 'text-gray-700'
  }`,
  moves: `text-xs px-2 py-1 rounded-full ${
    isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'
  }`,
})

export const getTurnIndicatorClasses = () =>
  'inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full'
