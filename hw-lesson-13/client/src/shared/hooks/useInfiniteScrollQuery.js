import { useCallback, useEffect, useRef, useState } from 'react'
import { useGetPostsQuery } from '../../entities/post/api/postsApi'

export const useInfiniteScrollQuery = (limit = 10) => {
  const [page, setPage] = useState(1)
  const [allPosts, setAllPosts] = useState([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const observer = useRef()

  const { data, isLoading, error } = useGetPostsQuery({ page, limit })

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

    if (isLoadingMore) setTimeout(() => setIsLoadingMore(false), 300)
  }, [data, page, isLoadingMore])

  const triggerRef = useCallback(
    node => {
      if (!node || isLoadingMore) return

      observer.current?.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && data?.pagination?.hasNextPage) {
          setIsLoadingMore(true)
          setPage(p => p + 1)
        }
      })

      observer.current.observe(node)
    },
    [isLoadingMore, data?.pagination?.hasNextPage]
  )

  return {
    posts: allPosts,
    pagination: data?.pagination || {},
    isLoading: isLoading && page === 1,
    isLoadingMore,
    error,
    triggerRef,
    reset: () => {
      setPage(1)
      setAllPosts([])
      setIsLoadingMore(false)
    },
  }
}
