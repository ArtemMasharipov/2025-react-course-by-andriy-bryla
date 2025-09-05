import { useState } from 'react'
import { useGetPostsQuery } from '../../entities/post/api/postsApi'

export const usePostsQuery = (limit = 10) => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error, refetch } = useGetPostsQuery({
    page,
    limit,
  })

  const pagination = data?.pagination || {}

  return {
    posts: data?.posts || [],
    pagination,
    isLoading,
    isFetching,
    error,
    refetch,
    currentPage: page,
    goToPage: newPage =>
      newPage >= 1 && newPage <= pagination.totalPages && setPage(newPage),
    nextPage: () => pagination.hasNextPage && setPage(p => p + 1),
    prevPage: () => pagination.hasPrevPage && setPage(p => p - 1),
  }
}
