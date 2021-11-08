// todo: refactoring
import React, { useState } from 'react'
import styles from 'css/Navigation.module.css'
import { Link, withRouter } from 'react-router-dom'
import LoginModal from './LoginModal'

const Navigation = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false)
  // const [userProfile, setUserProfile] = useState(null)
  // const [dropdownOpen, setOpen] = useState(false)
  // const history = useHistory()
  // const toggle = () => setOpen(!dropdownOpen)

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  // useEffect(() => {
  //   var param = new URLSearchParams(window.location.search).get('error')
  //   if (param === 'login') {
  //     alert('로그인 에러가 발생했습니다. 다른 소셜계정으로 로그인 해주세요.')
  //   }
  //   console.log(JWT_TOKEN)
  //   if (JWT_TOKEN) {
  //     axios
  //       .get(`/api/v1/user/profile/`)
  //       .then((res) => {
  //         console.log(res.data)
  //         setUserProfile(res.data)
  //         localStorage.setItem('userName', res.data.username)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //         if (err.response.status === 401) {
  //           window.alert('로그인 에러입니다.')
  //         }
  //         setUserProfile(null)
  //         removeCookie('Authorization', { path: '/' })
  //         localStorage.removeItem('userName')
  //       })
  //   }
  // }, [])

  return (
    <div className={styles.topbar}>
      <div className={styles.logoSpace}>
        <img className={styles.logo} alt="iterview-logo" src="/img/iterview_logo_dark.png"></img>
      </div>
      <div className={styles.menuSpace}>
        <Link to="/">
          <button className={styles.home}>
            <div className={styles.menuIcon}>
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.699951 7.50011H13.3M1.04995 5.40012H12.95M2.09995 3.30012H11.9M1.04995 9.60011H12.95M2.09995 11.7001H11.9M6.99995 1.0188V13.9057M5.24995 1.36996C2.79995 5.56996 2.79995 9.43098 5.24995 13.631M8.74995 1.30896C11.55 5.50896 11.9 9.43098 8.74995 13.631"
                  stroke="#09C558"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="7" cy="7.5" r="6.5" stroke="#09C558" />
              </svg>
            </div>
            <div className={styles.menuText}>
              <span>Home</span>
            </div>
          </button>
        </Link>
        <Link to="/MyPage/MyRegisterQuestion">
          <button className={styles.my}>
            <div className={styles.menuIcon}>
              <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.375 8.375V14.5H15.075V8.375M1.125 7.9375L9.675 0.9375L16.875 7.9375M3.375 4.4375V0.5H5.175V2.6875"
                  stroke="#160CFB"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className={styles.menuText}>
              <span>마이페이지</span>
            </div>
          </button>
        </Link>
        <Link to="/QuestionSearch">
          <button className={styles.search}>
            <div className={styles.menuIcon}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5.44444" cy="5.94444" r="4.94444" stroke="#FC2F31" />
                <path
                  d="M9.33325 9.44434L13.9999 14.4999"
                  stroke="#FC2F31"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className={styles.menuText}>
              <span>문제검색</span>
            </div>
          </button>
        </Link>
        <Link to="/QuestionRegister">
          <button className={styles.add}>
            <div className={styles.menuIcon}>
              <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.14555 2.95324H14.8546M3.14555 5.89713H14.8546M3.14555 8.35038H10.2728M3.14555 11.2943H0.600098V0.5H17.4001V11.2943H9.25464L3.14555 14.5V11.2943Z"
                  stroke="#D58A34"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className={styles.menuText}>
              <span>문제등록</span>
            </div>
          </button>
        </Link>
        <Link to="/SetQuizOptions">
          <button className={styles.quiz}>
            <div className={styles.menuIcon}>
              <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="7.5" r="6.5" stroke="#FAE45B" />
                <path
                  d="M5.2778 7.50003H8.00003V4.00003M1.38892 7.50003H2.55558M14.6111 7.50003H13.4445M8.00003 0.888916V2.05558M8.00003 14.1111V12.9445"
                  stroke="#FAE45B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="7.99995" cy="7.49995" r="0.777778" fill="#FAE45B" />
              </svg>
            </div>
            <div className={styles.menuText}>
              <span>퀴즈</span>
            </div>
          </button>
        </Link>
      </div>
      <div className={styles.loginSpace}>
        <div className={styles.loginIcon}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7.5" cy="7.5" r="7" stroke="#111036" />
            <path
              d="M10.3334 5.00008C10.3334 6.56489 9.06489 7.83342 7.50008 7.83342C5.93527 7.83342 4.66675 6.56489 4.66675 5.00008C4.66675 3.43527 5.93527 2.16675 7.50008 2.16675C9.06489 2.16675 10.3334 3.43527 10.3334 5.00008Z"
              stroke="#111036"
              stroke-linecap="round"
            />
            <path
              d="M3.33325 12.9167C4.07399 9.58341 4.99992 9.16675 7.49992 9.16675C9.99992 9.16675 10.9258 9.58341 11.6666 12.9167"
              stroke="#111036"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <button className={styles.loginText} onClick={openModal}>
          <span>LOGIN</span>
        </button>
        <button className={styles.loginDropdown}>
          <svg width="24" height="13" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1.4231L11.1538 10.7308V10.7308C11.6212 11.1981 12.3788 11.1981 12.8462 10.7308V10.7308L23 1.4231"
              stroke="#111036"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <LoginModal open={modalOpen} close={closeModal}></LoginModal>
      </div>
    </div>
  )
}

export default withRouter(Navigation)
