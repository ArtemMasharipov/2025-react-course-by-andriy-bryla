import { UserItem } from '@/entities/user'
import { UserDeleteButton, UserEditButton } from '@/features/users'

import { roles } from '@/shared/config/roles'

export function UserListItemWithActions({
  user,
  currentUser,
  currentRole,
  onDeleted,
}) {
  const isSelf = currentUser && user.uid === currentUser.uid
  const canEdit = currentRole === roles.admin && !isSelf
  const canDelete = currentRole === roles.admin && !isSelf

  return (
    <UserItem user={user}>
      <div className="flex gap-1 items-center">
        {canEdit && <UserEditButton userId={user.uid} />}
        {canDelete && (
          <UserDeleteButton userId={user.uid} onDeleted={onDeleted} />
        )}
      </div>
    </UserItem>
  )
}
