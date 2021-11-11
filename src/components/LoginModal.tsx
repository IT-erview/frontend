// todo: 타 tsx 파일과 코드 스타일 맞추기
import React from 'react'
import styles from 'css/LoginModal.module.css'
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL } from 'constants/Oauth'

const iterviewLogo = '/img/iterview_logo_dark.png'
const googleLogo = '/img/google_logo.png'
const githubLogo = '/img/github_logo.png'

function LoginModal(props: any) {
  const { open, close } = props

  return (
    // 모달이 열릴때 openModal 클래스가 생성
    <>
      {open ? (
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
                  <span>Google으로 계속하기</span>
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
    </>
  )
}

export default LoginModal
