// todo: refactoring
import LoginModal from 'views/common/login/LoginModal'
import { useDispatch } from 'react-redux'
import { setModalOpen } from 'modules/loginModal'

const LoginPage = () => {
  const dispatch = useDispatch()

  dispatch(setModalOpen(true))

  return <LoginModal />
}
export default LoginPage
