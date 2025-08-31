import { useSelector } from 'react-redux'

import { PostCard } from '@/entities/post'
import { PageBoundaryBadge, PostListSkeleton, ProgressBar } from '@/shared'

import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { selectIsFetchingMore, selectPageMarkers } from '../model/selectors'

export const InfiniteScrollList = () => {
  const { posts, isLoading, hasNextPage, lastPostCallback } = useInfiniteScroll()
  const pageMarkers = useSelector(selectPageMarkers)
  const isFetchingMore = useSelector(selectIsFetchingMore)

  if (posts.length === 0 && isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <p className="mt-2 text-gray-600">Loading posts...</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No posts found.</p>
      </div>
    )
  }

  const renderPostsWithBoundaries = () => {
    const result = []

    posts.forEach((post, index) => {
      result.push(
        <PostCard key={post._id} post={post} />
      )

      if (pageMarkers.includes(index)) {
        const pageNumber = pageMarkers.indexOf(index) + 1
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
    <div className="space-y-4" aria-busy={isFetchingMore} aria-live="polite">
      <ProgressBar isLoading={isFetchingMore} />

      {renderPostsWithBoundaries()}

      {isFetchingMore && (
        <PostListSkeleton count={3} />
      )}

      {hasNextPage && !isFetchingMore && (
        <LoadingIndicator />
      )}

      {!hasNextPage && posts.length > 0 && <EndOfListMessage />}
    </div>
  )
}
