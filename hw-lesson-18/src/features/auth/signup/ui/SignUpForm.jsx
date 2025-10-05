import { frontRoutes } from '@/shared/config/routes/frontRoutes'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useSignUp } from '../model/useSignUp'

export default function SignUpForm({ onSuccess }) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signUp, isLoading, error } = useSignUp()
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    try {
      await signUp({ email, password, displayName })
      onSuccess && onSuccess()
      navigate(frontRoutes.pages.HomePage.navigationPath)
    } catch (err) {
      setErrorMessage(err?.message || t('auth.signupError'))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('auth.displayName')}
        </label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder={t('auth.enterName')}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('auth.email')}
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('auth.enterEmail')}
          required
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('auth.password')}
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('auth.enterPassword')}
          type="password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('auth.signup')}
      </button>
      {(error || errorMessage) && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md text-sm">
          {errorMessage || error?.data?.message || t('common.error')}
        </div>
      )}
    </form>
  )
}
