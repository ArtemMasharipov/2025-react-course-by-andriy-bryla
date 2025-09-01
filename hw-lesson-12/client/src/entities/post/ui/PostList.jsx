import { PageBoundaryBadge, PostListSkeleton, ProgressBar } from '@/shared'
import { usePosts } from '@/shared/hooks/usePosts'
import { PostCard } from './PostCard'

export const PostList = ({ mode = 'pagination' }) => {
  const {
    posts,
    isLoading,
    isLoadingMore,
    isLoadingPage,
    pagination,
    pageMarkers,
    error,
    lastPostCallback,
    goToPage,
    goToNextPage,
    goToPrevPage,
    refetch
  } = usePosts(mode)

  // Loading state
  if (posts.length === 0 && isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <p className="mt-2 text-gray-600">Loading posts...</p>
      </div>
    )
  }

  // Error state
  if (error && posts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-4xl mb-2">⚠️</div>
        <p className="text-red-600">Error loading posts: {error}</p>
        <button
          onClick={refetch}
          className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No posts found.</p>
      </div>
    )
  }

  const renderPosts = () => {
    const result = []

    posts.forEach((post, index) => {
      result.push(<PostCard key={post._id} post={post} />)

      // Add page boundaries for infinite scroll
      if (mode === 'infinite' && pageMarkers.includes(index)) {
        const pageNumber = pageMarkers.indexOf(index) + 2 // +2 because we show the page that just ended
        result.push(
          <PageBoundaryBadge key={`boundary-${index}`} pageNumber={pageNumber} />
        )
      }
    })

    return result
  }

  const LoadingIndicator = () => (
    <div ref={lastPostCallback} className="flex justify-center py-6">
      <div className="text-sm text-emerald-500">
        Loading more posts...
      </div>
    </div>
  )

  const EndOfListMessage = () => (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <div className="text-emerald-400 text-4xl">🎉</div>
      <div>
        <h3 className="text-lg font-semibold text-emerald-800 mb-2">
          You've reached the end!
        </h3>
        <p className="text-emerald-600">
          You've seen all posts. Great job exploring!
        </p>
      </div>
    </div>
  )

  return (
    <div className="space-y-4" aria-busy={isLoadingMore || isLoadingPage} aria-live="polite">
      <ProgressBar isLoading={isLoadingMore || isLoadingPage} />

      {mode === 'pagination' && isLoadingPage ? (
        <PostListSkeleton count={5} />
      ) : (
        renderPosts()
      )}

      {mode === 'infinite' && (
        <>
          {isLoadingMore && <PostListSkeleton count={3} />}
          {pagination.hasNextPage && !isLoadingMore && <LoadingIndicator />}
          {!pagination.hasNextPage && posts.length > 0 &&
           pagination.currentPage >= pagination.totalPages &&
           pagination.totalPages > 1 && <EndOfListMessage />}
        </>
      )}

      {mode === 'pagination' && !isLoadingPage && (
        <div className="flex items-center justify-center gap-1 mt-6 flex-wrap" aria-live="polite">
          <button
            onClick={goToPrevPage}
            disabled={!pagination.hasPrevPage}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {(() => {
            const delta = 2
            const range = []
            const { currentPage, totalPages } = pagination

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

            return range.map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && goToPage(page)}
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
            ))
          })()}

          <button
            onClick={goToNextPage}
            disabled={!pagination.hasNextPage}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
