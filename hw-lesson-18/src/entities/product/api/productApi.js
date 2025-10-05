import { createEntityApi } from '@/shared/api'

export const productApi = createEntityApi('product', 'products')

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi
