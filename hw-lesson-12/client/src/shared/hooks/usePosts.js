import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectAllPosts,
  selectIsLoading,
  selectIsLoadingMore,
  selectIsLoadingPage,
  selectPageMarkers,
  selectPagination,
  selectPostError,
  selectViewMode,
} from '../../entities/post/model/selectors'
import {
  setCurrentPage,
  setLoadingPage,
  setViewMode,
} from '../../entities/post/model/slice'
import { fetchPostsThunk } from '../../entities/post/model/thunks'

export const usePosts = (mode = 'pagination') => {
  const dispatch = useDispatch()

  // Selectors
  const posts = useSelector(selectAllPosts)
  const isLoading = useSelector(selectIsLoading)
  const isLoadingMore = useSelector(selectIsLoadingMore)
  const isLoadingPage = useSelector(selectIsLoadingPage)
  const pagination = useSelector(selectPagination)
  const pageMarkers = useSelector(selectPageMarkers)
  const error = useSelector(selectPostError)
  const currentViewMode = useSelector(selectViewMode)

  // Infinite scroll setup
  const observer = useRef()

  // Set view mode if different
  useEffect(() => {
    if (currentViewMode !== mode) {
      dispatch(setViewMode(mode))
    }
  }, [dispatch, mode, currentViewMode])

  // Infinite scroll callback
  const lastPostCallback = useCallback(
    node => {
      if (mode !== 'infinite' || isLoading || isLoadingMore) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        entries => {
          if (
            entries[0].isIntersecting &&
            pagination.hasNextPage &&
            !isLoadingMore
          ) {
            const nextPage = pagination.currentPage + 1
            dispatch(setCurrentPage(nextPage))
            dispatch(
              fetchPostsThunk({
                page: nextPage,
                limit: pagination.itemsPerPage,
              })
            )
          }
        },
        {
          rootMargin: '400px 0px',
          threshold: 0.1,
        }
      )

      if (node) observer.current.observe(node)
    },
    [
      mode,
      isLoading,
      isLoadingMore,
      pagination.hasNextPage,
      pagination.currentPage,
      pagination.itemsPerPage,
      dispatch,
    ]
  )

  // Pagination navigation
  const goToPage = useCallback(
    page => {
      if (
        page >= 1 &&
        page <= pagination.totalPages &&
        page !== pagination.currentPage
      ) {
        dispatch(setLoadingPage(true))
        dispatch(setCurrentPage(page))
        dispatch(fetchPostsThunk({ page, limit: pagination.itemsPerPage }))
      }
    },
    [
      dispatch,
      pagination.totalPages,
      pagination.currentPage,
      pagination.itemsPerPage,
    ]
  )

  const goToNextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      goToPage(pagination.currentPage + 1)
    }
  }, [goToPage, pagination.hasNextPage, pagination.currentPage])

  const goToPrevPage = useCallback(() => {
    if (pagination.hasPrevPage) {
      goToPage(pagination.currentPage - 1)
    }
  }, [goToPage, pagination.hasPrevPage, pagination.currentPage])

  // Refetch function
  const refetch = useCallback(() => {
    dispatch(fetchPostsThunk({ page: 1, limit: pagination.itemsPerPage }))
  }, [dispatch, pagination.itemsPerPage])

  // Initial fetch
  useEffect(() => {
    if (posts.length === 0 && !isLoading) {
      dispatch(fetchPostsThunk({ page: 1, limit: 10 }))
    }
  }, [dispatch, posts.length, isLoading])

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  return {
    // Data
    posts,
    pagination,
    pageMarkers,
    error,

    // Loading states
    isLoading,
    isLoadingMore,
    isLoadingPage,

    // Navigation functions
    goToPage,
    goToNextPage,
    goToPrevPage,
    refetch,

    // Infinite scroll
    lastPostCallback,

    // Current mode
    viewMode: mode,
  }
}
