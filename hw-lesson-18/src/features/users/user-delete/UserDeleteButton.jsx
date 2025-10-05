import deleteIcon from '@/assets/icons/delete-white.svg'
import { useDeleteUserMutation } from '@/entities/user'
import { useTranslation } from 'react-i18next'

export function UserDeleteButton({ userId, onDeleted }) {
  const { t } = useTranslation()
  const [deleteUser] = useDeleteUserMutation()
  const handleDelete = async () => {
    await deleteUser(userId)
    onDeleted && onDeleted(userId)
  }
  return (
    <button
      className="px-1.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-medium shadow focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center justify-center"
      onClick={handleDelete}
      title={t('users.delete')}
    >
      <img src={deleteIcon} alt={t('users.delete')} className="w-4 h-4" />
    </button>
  )
}
