import { useCallback, useEffect, useRef, useState } from 'react'
import { useGetPostsQuery } from '../../entities/post/api/postsApi'

export const useInfiniteScrollQuery = (limit = 10) => {
  const [page, setPage] = useState(1)
  const [allPosts, setAllPosts] = useState([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const observer = useRef()
  const requestInProgress = useRef(false)
  const debounceTimer = useRef(null)

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

    // Убираем загрузку с задержкой для плавности
    if (isLoadingMore && !isFetching) {
      const timer = setTimeout(() => {
        setIsLoadingMore(false)
        requestInProgress.current = false
      }, 300) // Уменьшили задержку
      
      return () => clearTimeout(timer)
    }
  }, [data, page, isLoadingMore, isFetching])

  const triggerRef = useCallback(
    node => {
      if (!node) return

      observer.current?.disconnect()
      observer.current = new IntersectionObserver(
        entries => {
          const [entry] = entries
          if (
            entry.isIntersecting &&
            data?.pagination?.hasNextPage &&
            !requestInProgress.current &&
            !isLoadingMore
          ) {
            // Дебаунс для предотвращения множественных запросов
            if (debounceTimer.current) {
              clearTimeout(debounceTimer.current)
            }

            debounceTimer.current = setTimeout(() => {
              if (!requestInProgress.current && !isLoadingMore) {
                requestInProgress.current = true
                setIsLoadingMore(true)
                setPage(p => p + 1)
              }
            }, 200) // Увеличенный дебаунс для стабильности
          }
        },
        {
          // Более консервативные настройки для предотвращения дерганья
          rootMargin: '100px 0px',
          threshold: 0.1,
        }
      )

      observer.current.observe(node)
    },
    [data?.pagination?.hasNextPage, isLoadingMore] // Возвращаем необходимые зависимости
  )

  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
      observer.current?.disconnect()
    }
  }, [])

  return {
    posts: allPosts,
    pagination: data?.pagination || {},
    isLoading: isLoading && page === 1,
    isLoadingMore: isLoadingMore || (requestInProgress.current && isFetching),
    error,
    triggerRef,
    reset: () => {
      setPage(1)
      setAllPosts([])
      setIsLoadingMore(false)
      requestInProgress.current = false
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    },
  }
}
