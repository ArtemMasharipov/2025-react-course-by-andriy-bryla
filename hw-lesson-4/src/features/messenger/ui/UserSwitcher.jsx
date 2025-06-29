import { Button } from '../../../shared'
import { USERS } from '../constants'

export default function UserSwitcher({ currentUser, onUserChange }) {
  const handleUserClick = (user) => () => onUserChange(user)

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span className="text-sm text-gray-700 font-medium">
          Користувач:
        </span>
      </div>
      <div className="flex gap-2">
        {USERS.map(user => (
          <Button
            key={user}
            onClick={handleUserClick(user)}
            variant={currentUser === user ? 'primary' : 'outline'}
            size="sm"
          >
            {user}
          </Button>
        ))}
      </div>
    </div>
  )
}
