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

    // Убираем загрузку с небольшой задержкой для плавности
    if (isLoadingMore && !isFetching) {
      setTimeout(() => {
        setIsLoadingMore(false)
        requestInProgress.current = false
      }, 500)
    }
  }, [data, page, isLoadingMore, isFetching])

  const triggerRef = useCallback(
    node => {
      if (!node || isLoadingMore || requestInProgress.current) return

      observer.current?.disconnect()
      observer.current = new IntersectionObserver(
        entries => {
          if (
            entries[0].isIntersecting &&
            data?.pagination?.hasNextPage &&
            !requestInProgress.current
          ) {
            // Дебаунс для предотвращения множественных запросов
            if (debounceTimer.current) {
              clearTimeout(debounceTimer.current)
            }

            debounceTimer.current = setTimeout(() => {
              if (!requestInProgress.current) {
                requestInProgress.current = true
                setIsLoadingMore(true)
                setPage(p => p + 1)
              }
            }, 100) // Уменьшенный дебаунс для быстрой реакции
          }
        },
        {
          // Триггер срабатывает когда элемент на 50% появляется в области видимости
          rootMargin: '50px 0px',
          threshold: 0.5,
        }
      )

      observer.current.observe(node)
    },
    [isLoadingMore, data?.pagination?.hasNextPage]
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
    isLoadingMore: isLoadingMore && isFetching,
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
