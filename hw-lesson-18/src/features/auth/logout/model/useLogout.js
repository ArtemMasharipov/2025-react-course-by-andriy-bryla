import { useLogoutMutation } from '../../api/authApi'
import { useDispatch } from 'react-redux'
import { logout as logoutAction } from '../../api/authSlice'

export function useLogout() {
  const [logoutApi] = useLogoutMutation()
  const dispatch = useDispatch()

  const logout = async () => {
    await logoutApi().unwrap()
    dispatch(logoutAction())
  }

  return { logout }
}
