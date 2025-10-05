import { useUpdateCartItemMutation } from '@/entities/cartItem'
import { ActionButton } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

export function CartRemoveButton({ userId, productId }) {
  const { t } = useTranslation()
  const [updateCart] = useUpdateCartItemMutation()
  
  return (
    <ActionButton
      variant="danger"
      size="sm"
      onClick={() => updateCart({ userId, productId, action: 'remove' })}
      className="whitespace-nowrap"
    >
      {t('cart.remove')}
    </ActionButton>
  )
}
