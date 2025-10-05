import { CartAddButton } from '@/features/cart'
import { FavoriteToggleButton } from '@/features/favorites'
import { ProductDeleteButton, ProductEditButton } from '@/features/products'
import { useProductPermissions } from '@/features/products/model/useProductPermissions'

export function ProductActions({ product, user, onDeleted }) {
  const permissions = useProductPermissions(product, user)
  
  return (
    <div className="flex flex-wrap gap-1 w-full">
      {permissions.canAddToCart && (
        <CartAddButton product={product} userId={user.uid} />
      )}
      {permissions.canAddToFavorites && (
        <FavoriteToggleButton product={product} userId={user.uid} />
      )}
      {permissions.canEdit && (
        <ProductEditButton productId={product.id} />
      )}
      {permissions.canDelete && (
        <ProductDeleteButton productId={product.id} onDeleted={onDeleted} />
      )}
    </div>
  )
}
