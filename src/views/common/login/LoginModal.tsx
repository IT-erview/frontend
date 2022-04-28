// todo: 타 tsx 파일과 코드 스타일 맞추기
// react
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// oauth
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL } from 'constants/Oauth'
// style
import styles from 'views/common/login/LoginModal.module.css'
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
        <div className={styles.modal}>
          <section>
            <button className={styles.close} onClick={close}>
              &times;
            </button>
            <div className={styles.header}>
              <img className={styles.iterviewLogo} src={iterviewLogo} alt="" />
            </div>
            <main>
              <a href={GOOGLE_AUTH_URL}>
                <button className={styles.googleLogin}>
                  <img className={styles.googleLogo} src={googleLogo} alt="googleLogo" />
                  <span className={styles.googleLoginText}>Google으로 계속하기</span>
                </button>{' '}
              </a>
              <br />
              <a href={GITHUB_AUTH_URL}>
                <button className={styles.githubLogin}>
                  <img className={styles.githubLogo} src={githubLogo} alt="githubLogo" />
                  Github으로 계속하기
                </button>
              </a>
            </main>
          </section>
        </div>
      ) : null}
    </div>
  )
}

export default LoginModal
