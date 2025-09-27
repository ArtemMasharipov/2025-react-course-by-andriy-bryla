import { selectAuthUser } from '@/features/auth'
import { roles } from '@/shared/config/roles'
import { UserList } from '@/widgets/userList/UserList'
import { useSelector } from 'react-redux'
import ForbiddenPage from './ForbiddenPage'

export default function UsersPage() {
  const user = useSelector(selectAuthUser)

  if (!user || user.role !== roles.admin) {
    return <ForbiddenPage />
  }

  return (
    <div className="space-y-6">
      <UserList />
    </div>
  )
}
