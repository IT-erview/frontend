// todo: refactoring
import LoginModal from 'components/LoginModal'
import { useDispatch } from 'react-redux'
import { setModalOpen } from 'modules/loginModal'

const LoginPage = () => {
  const dispatch = useDispatch()

  dispatch(setModalOpen(true))

  return <LoginModal />
}
export default LoginPage
