import { useUpdateCartItemMutation } from '@/entities/cartItem'
import { ActionButton } from '@/shared/ui'

export function CartDecreaseButton({ userId, productId }) {
  const [updateCart] = useUpdateCartItemMutation()
  
  return (
    <ActionButton
      variant="warning"
      size="sm"
      onClick={() => updateCart({ userId, productId, action: 'decrease' })}
      className="w-8 h-8 p-0 flex items-center justify-center"
    >
      -
    </ActionButton>
  )
}
