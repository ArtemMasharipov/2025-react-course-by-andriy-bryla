import { useGetPostsQuery } from '@entities/post/api/postsApi'
import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_LIMIT = 10
const SCROLL_MARGIN = '100px'

export const useInfiniteScrollQuery = (limit = DEFAULT_LIMIT) => {
  const [page, setPage] = useState(1)
  const [allPosts, setAllPosts] = useState([])
  const observer = useRef()
  const isLoadingRef = useRef(false)

  const { data, isLoading, error, isFetching } = useGetPostsQuery({
    page,
    limit,
  })

  useEffect(() => {
    if (!data?.posts) return

    setAllPosts(prev =>
      page === 1
        ? data.posts
        : [
            ...prev,
            ...data.posts.filter(p => !prev.some(ex => ex._id === p._id)),
          ]
    )

    isLoadingRef.current = false
  }, [data, page])

  const triggerRef = useCallback(
    node => {
      if (!node || isFetching || isLoadingRef.current) return

      observer.current?.disconnect()
      observer.current = new IntersectionObserver(
        entries => {
          if (
            entries[0].isIntersecting &&
            data?.pagination?.hasNextPage &&
            !isLoadingRef.current
          ) {
            isLoadingRef.current = true
            setPage(p => p + 1)
          }
        },
        { rootMargin: SCROLL_MARGIN }
      )

      observer.current.observe(node)
    },
    [data?.pagination?.hasNextPage, isFetching]
  )

  useEffect(() => {
    return () => observer.current?.disconnect()
  }, [])

  return {
    posts: allPosts,
    pagination: data?.pagination || {},
    isLoading: isLoading && page === 1,
    isLoadingMore: isFetching && page > 1,
    error,
    triggerRef,
    reset: () => {
      setPage(1)
      setAllPosts([])
      isLoadingRef.current = false
    },
  }
}
