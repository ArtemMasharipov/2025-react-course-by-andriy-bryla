import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFilteredProducts,
  selectProductsError,
  selectProductsStatus,
} from '../model/selectors'
import { deleteProductThunk } from '../model/thunks'

export const useProducts = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectFilteredProducts)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)

  const deleteProduct = useCallback(
    productId => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        dispatch(deleteProductThunk(productId))
      }
    },
    [dispatch]
  )

  return {
    products,
    status,
    error,
    deleteProduct,
  }
}
