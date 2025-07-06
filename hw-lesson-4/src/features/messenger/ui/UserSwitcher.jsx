import { UIButton } from '../../../shared'
import { USERS } from '../constants'

export default function UserSwitcher({ currentUser, onUserChange }) {
  const handleUserClick = (user) => () => onUserChange(user)

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 w-full">
      <div className="flex items-center gap-2 w-full">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span className="text-sm text-gray-700 font-medium w-28">Користувач:</span>
      </div>
      <div className="flex flex-col gap-2 w-full sm:flex-row sm:gap-2">
        {USERS.map(user => (
          <UIButton
            key={user}
            onClick={handleUserClick(user)}
            variant={currentUser === user ? 'primary' : 'outline'}
            size="sm"
            className="w-full sm:w-32"
          >
            {user}
          </UIButton>
        ))}
      </div>
    </div>
  )
}
