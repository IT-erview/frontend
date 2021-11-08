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
            <img className="nav-icon" src="/img/nav_icon1.png" alt="nav_icon" />
            <span>Home</span>
          </button>
        </Link>
        <Link to="/MyPage/MyRegisterQuestion">
          <button className={styles.my}>
            <img className="nav-icon" src="/img/nav_icon2.png" alt="nav_icon" />
            <span>마이페이지</span>
          </button>
        </Link>
        <Link to="/QuestionSearch">
          <button className={styles.search}>
            <img className="nav-icon" src="/img/nav_icon3.png" alt="nav_icon" />
            <span>문제검색</span>
          </button>
        </Link>
        <Link to="/QuestionRegister">
          <button className={styles.add}>
            <img className="nav-icon" src="/img/nav_icon4.png" alt="nav_icon" />
            <span>문제등록</span>
          </button>
        </Link>
        <Link to="/SetQuizOptions">
          <button className={styles.quiz}>
            <img className="nav-icon" src="/img/nav_icon5.png" alt="nav_icon" />
            <span>퀴즈</span>
          </button>
        </Link>
      </div>
      <div className={styles.loginSpace}>
        <div className={styles.loginIcon}>
          <img src="/img/login_icon.png" alt="login_icon" />
        </div>
        <button className={styles.loginText} onClick={openModal}>
          <span>LOGIN</span>
        </button>
        <span className={styles.loginDropdown}>/</span>
        <LoginModal open={modalOpen} close={closeModal}></LoginModal>
      </div>
    </div>
  )
}

export default withRouter(Navigation)
