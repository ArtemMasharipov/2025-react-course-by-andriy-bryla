import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Pagination, usePagination } from '@/features/pagination'
import { selectIsLoadingPage } from '@/features/pagination/model/selectors'
import { PostListSkeleton, ProgressBar } from '@/shared'

import { selectAllPosts, selectPostError, selectPostStatus } from '../model/selectors'
import { fetchPostsThunk } from '../model/thunks'
import { PostCard } from './PostCard'

export const PaginatedPostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const status = useSelector(selectPostStatus)
  const error = useSelector(selectPostError)
  const isLoadingPage = useSelector(selectIsLoadingPage)
  const { currentPage } = usePagination()

  useEffect(() => {
    dispatch(fetchPostsThunk({ page: currentPage, limit: 10 }))
  }, [dispatch, currentPage])

  if (status === 'loading' && posts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <p className="mt-2 text-gray-600">Loading posts...</p>
      </div>
    )
  }

  if (status === 'failed' && posts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-4xl mb-2">⚠️</div>
        <p className="text-red-600">Error loading posts: {error}</p>
        <button
          onClick={() => dispatch(fetchPostsThunk({ page: currentPage, limit: 10 }))}
          className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Try Again
        </button>
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

  return (
    <div aria-busy={isLoadingPage} aria-live="polite">
      <ProgressBar isLoading={isLoadingPage} />

      {isLoadingPage ? (
        <PostListSkeleton count={5} />
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
      <Pagination />
    </div>
  )
}
