export const PaginationControls = ({ data }) => {
  if (!data.pagination.totalPages || data.pagination.totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={data.prevPage}
        disabled={!data.pagination.hasPrevPage}
        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      <span className="px-3 py-2 text-sm text-gray-600">
        Page {data.currentPage} of {data.pagination.totalPages}
      </span>

      <button
        onClick={data.nextPage}
        disabled={!data.pagination.hasNextPage}
        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  )
}
