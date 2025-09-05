import { PostCard } from '@entities/post/ui/PostCard'
import { LoadingSpinner, PostListSkeleton } from '@shared'
import { useInfiniteScrollQuery } from '@shared/hooks/useInfiniteScrollQuery'
import { usePostsQuery } from '@shared/hooks/usePostsQuery'
import { PaginationControls } from './components/PaginationControls'

export const PostList = ({ mode = 'pagination' }) => {
  const paginationData = usePostsQuery()
  const infiniteData = useInfiniteScrollQuery()

  const data = mode === 'infinite' ? infiniteData : paginationData

  if (data.isLoading) return <PostListSkeleton count={5} />

  if (data.error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-4xl mb-2"></div>
        <p className="text-red-600 mb-4">
          Error: {data.error?.data?.message || 'Failed to load posts'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!data.posts?.length) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-4xl mb-2"></div>
        <p className="text-gray-500">No posts found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {mode === 'pagination' && data.isFetching && (
        <LoadingSpinner text="Loading..." className="py-2" />
      )}

      <div className="space-y-4">
        {data.posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {mode === 'infinite' && (
        <>
          {data.pagination.hasNextPage && (
            <div ref={data.triggerRef} className="py-6">
              {data.isLoadingMore && (
                <>
                  <LoadingSpinner text="Loading more posts..." className="pb-4" />
                  <PostListSkeleton count={2} />
                </>
              )}
            </div>
          )}

          {!data.pagination.hasNextPage && data.posts.length > 0 && (
            <div className="text-center py-6 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="text-emerald-600 mb-3">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="font-medium">All {data.pagination.total} posts loaded!</p>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Scroll to Top
              </button>
            </div>
          )}
        </>
      )}

      {mode === 'pagination' && !data.isFetching && (
        <PaginationControls data={data} />
      )}
    </div>
  )
}
