import { CartItemCard } from '@/entities/cartItem'
import {
    CartDecreaseButton,
    CartIncreaseButton,
    CartRemoveButton,
} from '@/features/cart'

export function CartItemCardWithActions({ item, userId, productId }) {
  return (
    <CartItemCard item={item}>
      <div className="flex items-center gap-2">
        <CartDecreaseButton userId={userId} productId={productId} />
        <span className="px-3 py-1 bg-gray-100 rounded-md min-w-[2rem] text-center font-medium">
          {item.quantity || 1}
        </span>
        <CartIncreaseButton
          userId={userId}
          productId={productId}
          product={item}
        />
      </div>
      <CartRemoveButton userId={userId} productId={productId} />
    </CartItemCard>
  )
}
