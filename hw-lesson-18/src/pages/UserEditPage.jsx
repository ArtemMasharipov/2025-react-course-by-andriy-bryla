import { useGetAllUsersQuery } from '@/entities/user'
import { UserEditForm } from '@/features/users'
import { frontRoutes } from '@/shared/config/routes/frontRoutes'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'

export default function UserEditPage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: users = [], isLoading } = useGetAllUsersQuery()
  const user = users.find((u) => u.id === id)

  const handleSuccess = () => {
    navigate(frontRoutes.pages.UsersPage.navigationPath)
  }

  if (isLoading) return <div>{t('common.loading')}</div>

  return (
    <div>
      <h1>{t('users.edit')}</h1>
      <UserEditForm user={user} onSuccess={handleSuccess} />
    </div>
  )
}
