import { useAddUserMutation, UserForm, useUpdateUserMutation } from '@/entities/user'
import { useTranslation } from 'react-i18next'

export function UserEditForm({ user = {}, onSuccess }) {
  const { t } = useTranslation()
  const [updateUser, { isLoading: isUpdating, error: updateError }] =
    useUpdateUserMutation()
  const [addUser, { isLoading: isAdding, error: addError }] =
    useAddUserMutation()

  const handleSubmit = async ({ email, displayName, role }) => {
    if (user.id) {
      await updateUser({ id: user.id, data: { role } })
    } else {
      await addUser({ email, displayName, role })
    }
    onSuccess && onSuccess()
  }

  return (
    <div>
      <UserForm user={user} onSubmit={handleSubmit} />
      {(updateError || addError) && (
        <div className="text-red-500">
          {updateError?.data?.message || addError?.data?.message || t('common.error')}
        </div>
      )}
    </div>
  )
}
