import { ProductForm, useAddProductMutation } from '@/entities/product'

export function ProductAddForm({ onSuccess }) {
  const [addProduct] = useAddProductMutation()
  const handleSubmit = async ({ name, price, image }) => {
    await addProduct({ name, price, image })
    if (onSuccess) onSuccess()
  }
  return <ProductForm onSubmit={handleSubmit} />
}
