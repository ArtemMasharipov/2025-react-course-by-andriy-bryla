import { roles } from '@/shared/config/roles'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function UserForm({ user = {}, onSubmit }) {
  const { t } = useTranslation()
  const [email, setEmail] = useState(user?.email || '')
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [role, setRole] = useState(user?.role || 'user')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...user,
      email,
      displayName,
      role,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-md mx-auto"
    >
      <input
        className="border rounded px-2 py-1"
        placeholder={t('auth.email')}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={!!user.id}
        required
      />
      <input
        className="border rounded px-2 py-1"
        placeholder={t('auth.displayName')}
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        disabled={!!user.id}
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border rounded px-2 py-1"
      >
        {Object.entries(roles).map(([key, value]) => (
          <option key={key} value={value}>
            {t(`roles.${value}`)}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 mt-2"
      >
        {user.id ? t('users.save') : t('users.add')}
      </button>
    </form>
  )
}
