import { ProductCard } from '@/entities/product'
import { ProductActions } from '@/widgets/ProductActions'

export function ProductCardWithActions({ product, user, onDeleted }) {
  return (
    <ProductCard product={product}>
      <ProductActions product={product} user={user} onDeleted={onDeleted} />
    </ProductCard>
  )
}
