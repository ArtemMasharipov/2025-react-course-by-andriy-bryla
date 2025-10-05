import { useSignUpMutation } from '../../api/authApi'
export function useSignUp() {
  const [signUp, { isLoading, error }] = useSignUpMutation()

  const handleSignUp = async (data) => {
    await signUp(data).unwrap()
  }

  return { signUp: handleSignUp, isLoading, error }
}
