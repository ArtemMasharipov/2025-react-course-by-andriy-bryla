import { LoginForm } from '@/features/auth/login'
import { SignUpForm } from '@/features/auth/signup'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function LoginPage() {
  const { t } = useTranslation()
  const [showSignUp, setShowSignUp] = useState(false)
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          {showSignUp ? t('auth.signup') : t('auth.login')}
        </h1>
        {showSignUp ? (
          <SignUpForm onSuccess={() => setShowSignUp(false)} />
        ) : (
          <LoginForm onSuccess={() => {}} />
        )}
        <button
          className="mt-4 text-blue-600 hover:underline font-medium text-sm transition-colors duration-200 w-full text-center"
          type="button"
          onClick={() => setShowSignUp((v) => !v)}
        >
          {showSignUp ? t('auth.login') : t('auth.signup')}
        </button>
      </div>
    </div>
  )
}
