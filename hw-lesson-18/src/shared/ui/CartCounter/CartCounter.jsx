import { useGetUserCartQuery } from '@/entities/cartItem'
import { selectAuthUser } from '@/features/auth/api/authSlice'
import { useSelector } from 'react-redux'

export const CartCounter = ({ className = '' }) => {
  const user = useSelector(selectAuthUser)
  const { data: cart = {} } = useGetUserCartQuery(user?.uid || '', {
    skip: !user?.uid
  })

  const uniqueItemsCount = Object.values(cart).filter(item => item && item.quantity > 0).length

  if (!user || uniqueItemsCount === 0) {
    return null
  }

  return (
    <span
      className={`
        inline-flex items-center justify-center
        min-w-[20px] h-5 px-1.5
        text-xs font-bold text-white
        bg-red-500 rounded-full
        transform transition-all duration-200 ease-in-out
        hover:scale-110 hover:bg-red-600
        ${className}
      `}
      title={`${uniqueItemsCount} items in cart`}
    >
      {uniqueItemsCount > 99 ? '99+' : uniqueItemsCount}
    </span>
  )
}
