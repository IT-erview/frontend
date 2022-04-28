// todo: refactoring
// react
import { useDispatch } from 'react-redux'
// redux
import { setModalOpen } from 'modules/loginModal'
// component
import LoginModal from 'views/common/login/LoginModal'

const LoginPage = () => {
  const dispatch = useDispatch()

  dispatch(setModalOpen(true))

  return <LoginModal />
}
export default LoginPage
