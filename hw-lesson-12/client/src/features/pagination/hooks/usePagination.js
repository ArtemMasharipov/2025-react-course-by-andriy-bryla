import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectCurrentPage,
  selectHasNextPage,
  selectHasPrevPage,
  selectTotalPages,
} from '../model/selectors'
import { setCurrentPage } from '../model/slice'

export const usePagination = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector(selectCurrentPage)
  const totalPages = useSelector(selectTotalPages)
  const hasNextPage = useSelector(selectHasNextPage)
  const hasPrevPage = useSelector(selectHasPrevPage)

  const goToPage = useCallback(
    page => {
      if (page >= 1 && page <= totalPages) {
        dispatch(setCurrentPage(page))
      }
    },
    [dispatch, totalPages]
  )

  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      dispatch(setCurrentPage(currentPage + 1))
    }
  }, [dispatch, hasNextPage, currentPage])

  const goToPrevPage = useCallback(() => {
    if (hasPrevPage) {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }, [dispatch, hasPrevPage, currentPage])

  return {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
  }
}
