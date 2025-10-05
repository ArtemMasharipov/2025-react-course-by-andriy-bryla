import { frontRoutes } from '@/shared/config/routes/frontRoutes'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useLogin } from '../model/useLogin'

export default function LoginForm() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, googleLogin, isLoading, error } = useLogin()
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    try {
      await login({ email, password })
      navigate(frontRoutes.pages.HomePage.navigationPath)
    } catch (err) {
      setErrorMessage(err?.message || t('auth.loginError'))
    }
  }

  const handleGoogle = async () => {
    setErrorMessage('')
    try {
      await googleLogin()
      navigate(frontRoutes.pages.HomePage.navigationPath)
    } catch (err) {
      setErrorMessage(err?.message || t('auth.googleAuthError'))
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('auth.email')}
        </label>
        <input
          type="email"
          placeholder={t('auth.enterEmail')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('auth.password')}
        </label>
        <input
          type="password"
          placeholder={t('auth.enterPassword')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('auth.login')}
      </button>
      <button
        type="button"
        onClick={handleGoogle}
        disabled={isLoading}
        className="w-full py-2 rounded-md border border-gray-300 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 48 48"
        >
          <g>
            <path
              fill="#4285F4"
              d="M44.5 20H24v8.5h11.7C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.3 4.5 29.4 2.5 24 2.5 12.7 2.5 3.5 11.7 3.5 23S12.7 43.5 24 43.5c10.5 0 20-7.6 20-20 0-1.3-.1-2.1-.3-3.5z"
            />
            <path
              fill="#34A853"
              d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.3 4.5 29.4 2.5 24 2.5c-7.2 0-13 5.8-13 13 0 2.1.5 4.1 1.3 5.7z"
            />
            <path
              fill="#FBBC05"
              d="M24 43.5c6.1 0 11.2-2 15-5.5l-7-5.7c-2.1 1.5-4.8 2.4-8 2.4-6.1 0-11.3-4.1-13.1-9.6l-7 5.4C7.1 39.1 14.9 43.5 24 43.5z"
            />
            <path
              fill="#EA4335"
              d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2l-7 5.4C18.7 41.1 21.2 43.5 24 43.5c6.1 0 11.2-2 15-5.5l-7-5.7c-2.1 1.5-4.8 2.4-8 2.4-6.1 0-11.3-4.1-13.1-9.6l-7 5.4C7.1 39.1 14.9 43.5 24 43.5z"
            />
          </g>
        </svg>
        {t('common.google')}
      </button>
      {(error || errorMessage) && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md text-sm">
          {errorMessage || error?.data?.message || t('auth.loginError')}
        </div>
      )}
    </form>
  )
}
