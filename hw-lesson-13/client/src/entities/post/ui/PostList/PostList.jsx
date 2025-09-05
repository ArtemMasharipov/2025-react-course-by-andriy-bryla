import { Loading, PostListSkeleton } from '@/shared'
import { useInfiniteScrollQuery } from '@/shared/hooks/useInfiniteScrollQuery'
import { usePostsQuery } from '@/shared/hooks/usePostsQuery'
import { PostCard } from '../PostCard'
import { PaginationControls } from './components/PaginationControls'

const EmptyState = () => (
  <div className="text-center py-8">
    <div className="text-gray-400 text-4xl mb-2"></div>
    <p className="text-gray-500">No posts found</p>
  </div>
)

const ErrorState = ({ error }) => (
  <div className="text-center py-8">
    <div className="text-red-500 text-4xl mb-2"></div>
    <p className="text-red-600 mb-4">
      Error: {error?.data?.message || 'Failed to load posts'}
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
    >
      Retry
    </button>
  </div>
)

const EndMessage = ({ totalItems }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="text-center py-6 bg-emerald-50 rounded-lg">
      <div className="text-emerald-400 text-3xl mb-2"></div>
      <p className="text-emerald-600 mb-4">All {totalItems} posts loaded!</p>
      <button
        onClick={scrollToTop}
        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        Scroll to Top
      </button>
    </div>
  )
}

export const PostList = ({ mode = 'pagination' }) => {
  const paginationData = usePostsQuery()
  const infiniteData = useInfiniteScrollQuery()

  const data = mode === 'infinite' ? infiniteData : paginationData

  if (data.isLoading) return <PostListSkeleton count={5} />
  if (data.error) return <ErrorState error={data.error} />
  if (!data.posts?.length) return <EmptyState />

  return (
    <div className="space-y-4 post-list-container scroll-container">
      {mode === 'pagination' && data.isFetching && (
        <Loading size="sm" text="Loading..." className="py-2" />
      )}

      {mode === 'pagination' && data.isFetching ? (
        <div className="loading-skeleton">
          <PostListSkeleton count={5} />
        </div>
      ) : (
        <div className="space-y-4">
          {data.posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {mode === 'infinite' && (
        <>
          {data.pagination.hasNextPage && (
            <div
              ref={data.triggerRef}
              className="py-6 transition-opacity duration-300"
            >
              {data.isLoadingMore && (
                <>
                  <Loading text="Loading more posts..." className="pb-4" />
                  <PostListSkeleton count={2} />
                </>
              )}
            </div>
          )}

          {!data.pagination.hasNextPage && data.posts.length > 10 && (
            <EndMessage totalItems={data.pagination.totalItems} />
          )}
        </>
      )}

      {mode === 'pagination' && !data.isFetching && (
        <PaginationControls data={data} />
      )}
    </div>
  )
}
