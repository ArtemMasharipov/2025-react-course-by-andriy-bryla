import { useDeleteUserMutation } from '@/entities/user/api/userApi'
import { selectAuthUser } from '@/features/auth'
import { roles } from '@/shared/config/roles'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export function DeleteUserButton({ user }) {
  const currentUser = useSelector(selectAuthUser)
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const [isConfirming, setIsConfirming] = useState(false)

  const handleDelete = async () => {
    if (!isConfirming) {
      setIsConfirming(true)
      return
    }

    try {
      await deleteUser(user.id).unwrap()
      setIsConfirming(false)
    } catch (error) {
      setIsConfirming(false)
    }
  }

  const canDelete = currentUser?.role === roles.admin && currentUser.id !== user.id

  if (!canDelete) return null

  return (
    <div className="flex space-x-2">
      {isConfirming ? (
        <>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isDeleting ? 'Видаляю...' : 'Підтвердити'}
          </button>
          <button 
            onClick={() => setIsConfirming(false)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Скасувати
          </button>
        </>
      ) : (
        <button 
          onClick={handleDelete}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        >
          Видалити
        </button>
      )}
    </div>
  )
}
