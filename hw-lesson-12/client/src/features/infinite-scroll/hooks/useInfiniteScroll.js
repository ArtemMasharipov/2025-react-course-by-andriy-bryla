import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postApi } from '../../../entities/post'

import {
  selectInfiniteCurrentPage,
  selectInfiniteHasNextPage,
  selectInfiniteIsLoading,
  selectInfinitePosts,
  selectIsFetchingMore,
} from '../model/selectors'
import {
  addPosts,
  setCurrentPage,
  setError,
  setFetchingMore,
  setHasNextPage,
  setStatus,
} from '../model/slice'

export const useInfiniteScroll = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectInfinitePosts)
  const currentPage = useSelector(selectInfiniteCurrentPage)
  const hasNextPage = useSelector(selectInfiniteHasNextPage)
  const isLoading = useSelector(selectInfiniteIsLoading)
  const isFetchingMore = useSelector(selectIsFetchingMore)
  const observer = useRef()

  const fetchPosts = useCallback(
    async page => {
      try {
        if (page === 1) {
          dispatch(setStatus('loading'))
        } else {
          dispatch(setFetchingMore(true))
        }

        const response = await postApi.getPosts({ page, limit: 10 })
        const { posts: newPosts, pagination } = response

        dispatch(addPosts({ posts: newPosts, page }))
        dispatch(setHasNextPage(pagination.hasNextPage))

        if (page === 1) {
          dispatch(setStatus('succeeded'))
        } else {
          dispatch(setFetchingMore(false))
        }
      } catch (error) {
        dispatch(setError(error.message))
        dispatch(setStatus('failed'))
        dispatch(setFetchingMore(false))
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
