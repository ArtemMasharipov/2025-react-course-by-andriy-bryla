import { useDispatch } from 'react-redux'

import { usePagination } from '../hooks/usePagination'
import { setLoadingPage } from '../model/slice'

export const Pagination = () => {
  const dispatch = useDispatch()
  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
  } = usePagination()

  if (totalPages <= 1) return null

  const handlePageChange = (page) => {
    dispatch(setLoadingPage(true))
    goToPage(page)
  }

  const handleNextPage = () => {
    dispatch(setLoadingPage(true))
    goToNextPage()
  }

  const handlePrevPage = () => {
    dispatch(setLoadingPage(true))
    goToPrevPage()
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      range.push(i)
    }

    if (range[0] > 1) {
      if (range[0] > 2) range.unshift('...')
      range.unshift(1)
    }

    if (range[range.length - 1] < totalPages) {
      if (range[range.length - 1] < totalPages - 1) range.push('...')
      range.push(totalPages)
    }

    return range
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-6 flex-wrap" aria-live="polite">
      <button
        onClick={handlePrevPage}
        disabled={!hasPrevPage}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          disabled={typeof page !== 'number'}
          className={`px-3 py-2 text-sm font-medium rounded-md min-w-[40px] ${
            page === currentPage
              ? 'bg-emerald-600 text-white'
              : typeof page === 'number'
              ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              : 'text-gray-400 bg-transparent border-none cursor-default'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={!hasNextPage}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}
