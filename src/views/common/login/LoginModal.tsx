// todo: 타 tsx 파일과 코드 스타일 맞추기
// react
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// oauth
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL } from 'constants/Oauth'
// style
import 'views/common/login/LoginModal.sass'
// redux
import { ReducerType } from 'modules/rootReducer'
import { setModalOpen } from 'modules/loginModal'

const iterviewLogo = '/img/iterview_logo_dark.png'
const googleLogo = '/img/google_logo.png'
const githubLogo = '/img/github_logo.png'

function LoginModal() {
  const loginModal = useSelector<ReducerType, boolean>((state) => state.loginModal)
  const dispatch = useDispatch()

  const close = () => {
    dispatch(setModalOpen(false))
  }

  return (
    <div>
      {loginModal ? (
        <section className={'login-modal'}>
          <button className={'btn-close'} onClick={close}>
            &times;
          </button>
          <div className={'modal-header'}>
            <img src={iterviewLogo} className={'iterview-logo'} alt="iterview" />
          </div>
          <div className={'modal-content'}>
            <a href={GOOGLE_AUTH_URL} className={'btn-login btn-google'}>
              <img src={googleLogo} className={'login-icon'} alt="googleLogo" />
              <span className={'login-text'}>Google으로 계속하기</span>
            </a>
            <a href={GITHUB_AUTH_URL} className={'btn-login btn-github'}>
              <img src={githubLogo} className={'login-icon'} alt="githubLogo" />
              <span className={'login-text github-text'}>Github으로 계속하기</span>
            </a>
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default LoginModal
