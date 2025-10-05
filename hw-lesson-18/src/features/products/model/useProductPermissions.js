import { useMemo } from 'react'

/**
 * Хук для определения прав доступа к продукту
 * Выносим бизнес-логику из UI компонентов
 * 
 * @param {Object} product - продукт
 * @param {Object} user - пользователь
 * @returns {Object} объект с правами доступа
 */
export function useProductPermissions(product, user) {
  return useMemo(() => {
    if (!user || !product) {
      return {
        canEdit: false,
        canDelete: false,
        canAddToCart: false,
        canAddToFavorites: false
      }
    }

    const isOwner = product.ownerId === user.uid
    const role = user.role

    return {
      canEdit: role === 'admin' || (role === 'manager' && isOwner),
      canDelete: role === 'admin' || (role === 'manager' && isOwner),
      canAddToCart: role === 'user',
      canAddToFavorites: role === 'user'
    }
  }, [product?.ownerId, user?.uid, user?.role])
}
