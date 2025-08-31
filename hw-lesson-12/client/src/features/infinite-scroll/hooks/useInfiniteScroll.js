import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectAllPosts,
  selectPostStatus,
} from '../../../entities/post/model/selectors'
import { fetchPostsThunk } from '../../../entities/post/model/thunks'

import {
  selectInfiniteCurrentPage,
  selectInfiniteHasNextPage,
  selectInfiniteStatus,
  selectIsFetchingMore,
} from '../model/selectors'
import {
  setCurrentPage,
  setError,
  setFetchingMore,
  setStatus,
} from '../model/slice'

export const useInfiniteScroll = () => {
  const dispatch = useDispatch()

  // Use posts from main entity adapter instead of separate infinite scroll state
  const posts = useSelector(selectAllPosts)
  const mainStatus = useSelector(selectPostStatus)

  const currentPage = useSelector(selectInfiniteCurrentPage)
  const hasNextPage = useSelector(selectInfiniteHasNextPage)
  const infiniteStatus = useSelector(selectInfiniteStatus)
  const isFetchingMore = useSelector(selectIsFetchingMore)

  const observer = useRef()

  // Combine statuses for loading state
  const isLoading = mainStatus === 'loading' || infiniteStatus === 'loading'

  const fetchPosts = useCallback(
    async page => {
      try {
        if (page === 1) {
          dispatch(setStatus('loading'))
        } else {
          dispatch(setFetchingMore(true))
        }

        // Use the main fetchPostsThunk instead of direct API call
        await dispatch(fetchPostsThunk({ page, limit: 10 })).unwrap()

        if (page === 1) {
          dispatch(setStatus('succeeded'))
        } else {
          dispatch(setFetchingMore(false))
        }
      } catch (error) {
        dispatch(setError(error.message || 'Failed to fetch posts'))
        if (page === 1) {
          dispatch(setStatus('failed'))
        } else {
          dispatch(setFetchingMore(false))
        }
      }
    },
    [dispatch]
  )

  const lastPostCallback = useCallback(
    node => {
      if (isLoading || isFetchingMore) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingMore) {
            const nextPage = currentPage + 1
            dispatch(setCurrentPage(nextPage))
            fetchPosts(nextPage)
          }
        },
        {
          rootMargin: '400px 0px',
        }
      )

      if (node) observer.current.observe(node)
    },
    [isLoading, isFetchingMore, hasNextPage, currentPage, dispatch, fetchPosts]
  )

  useEffect(() => {
    fetchPosts(1)
  }, [fetchPosts])

  return {
    posts,
    isLoading,
    hasNextPage,
    lastPostCallback,
    refetch: () => fetchPosts(1),
  }
}
