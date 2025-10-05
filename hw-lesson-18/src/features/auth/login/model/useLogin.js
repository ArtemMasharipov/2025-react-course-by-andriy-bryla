import { useLoginMutation, useGoogleLoginMutation } from '../../api/authApi'

export function useLogin() {
  const [login, { isLoading, error }] = useLoginMutation()
  const [googleLogin, { isLoading: isGoogleLoading, error: googleError }] =
    useGoogleLoginMutation()

  const handleLogin = async (data) => {
    await login(data).unwrap()
  }

  const handleGoogleLogin = async () => {
    await googleLogin().unwrap()
  }

  return {
    login: handleLogin,
    googleLogin: handleGoogleLogin,
    isLoading: isLoading || isGoogleLoading,
    error: error || googleError,
  }
}
