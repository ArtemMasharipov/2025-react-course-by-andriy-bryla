import { PostCard } from '@entities/post/ui/PostCard'
import { PostListSkeleton } from '@shared'
import { useInfiniteScrollQuery } from '@shared/hooks/useInfiniteScrollQuery'
import { usePostsQuery } from '@shared/hooks/usePostsQuery'
import { PaginationControls } from './components/PaginationControls'

export const PostList = ({ mode = 'pagination' }) => {
  const paginationData = usePostsQuery()
  const infiniteData = useInfiniteScrollQuery()

  const data = mode === 'infinite' ? infiniteData : paginationData

  const isLoading = data.isLoading || (mode === 'pagination' && data.isFetching)
  if (isLoading) return <PostListSkeleton count={5} />

  if (data.error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">
          Error: {data.error?.data?.message || 'Failed to load posts'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!data.posts?.length) {
    return <div className="text-center py-8 text-gray-500">No posts found</div>
  }

  return (
    <div className="space-y-4">
      {data.posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}

      {mode === 'infinite' ? (
        <>
          {data.pagination.hasNextPage && (
            <div ref={data.triggerRef} className="py-6">
              {data.isLoadingMore && <PostListSkeleton count={2} />}
            </div>
          )}
          {!data.pagination.hasNextPage && data.posts.length > 0 && (
            <div className="text-center py-6 bg-emerald-50 rounded-lg">
              <p className="text-emerald-600 mb-3">✓ All {data.pagination.total} posts loaded!</p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                ↑ Scroll to Top
              </button>
            </div>
          )}
        </>
      ) : (
        <PaginationControls data={data} />
      )}
    </div>
  )
}
