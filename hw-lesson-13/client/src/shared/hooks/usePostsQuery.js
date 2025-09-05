import { useGetPostsQuery } from '@entities/post/api/postsApi'
import { useState } from 'react'

const DEFAULT_LIMIT = 10

export const usePostsQuery = (limit = DEFAULT_LIMIT) => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = useGetPostsQuery({
    page,
    limit,
  })

  return {
    posts: data?.posts || [],
    pagination: data?.pagination || {},
    isLoading,
    isFetching,
    error,
    currentPage: page,
    nextPage: () => data?.pagination?.hasNextPage && setPage(p => p + 1),
    prevPage: () => data?.pagination?.hasPrevPage && setPage(p => p - 1),
  }
}
