import { useUpdateCartItemMutation } from '@/entities/cartItem'
import { ActionButton } from '@/shared/ui'

export function CartIncreaseButton({ userId, productId, product }) {
  const [updateCart] = useUpdateCartItemMutation()
  
  return (
    <ActionButton
      variant="primary"
      size="sm"
      onClick={() => updateCart({ userId, productId, product, action: 'add' })}
      className="w-8 h-8 p-0 flex items-center justify-center"
    >
      +
    </ActionButton>
  )
}
