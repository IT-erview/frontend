import { withRouter } from 'react-router-dom'
import 'views/common/layout/Navigations.sass'

const Navigation = () => {
  return (
    <nav className={'navigation'}>
      <div className={'logo-wrap'}>
        <img src="/global/logo.svg" alt="logo" />
      </div>
      <div className={'menu-wrap'}>
        <ul>
          <li>
            <img src="/global/menu_icon_01.svg" alt="menu_icon" />
            <span>Home</span>
          </li>
          <li>
            <img src="/global/menu_icon_01.svg" alt="menu_icon" />
            <span>마이페이지</span>
          </li>
          <li>
            <img src="/global/menu_icon_01.svg" alt="menu_icon" />
            <span>문제검색</span>
          </li>
          <li>
            <img src="/global/menu_icon_01.svg" alt="menu_icon" />
            <span>문제등록</span>
          </li>
          <li>
            <img src="/global/menu_icon_01.svg" alt="menu_icon" />
            <span>퀴즈</span>
          </li>
        </ul>
      </div>
      <div className="login-wrap">
        <div className="login-button-wrap">
          <img src="/global/menu_icon_01.svg" alt="login_icon" />
          <span>LOGIN</span>
        </div>
        <div className="dropdown-button">
          <img src="/global/menu_icon_01.svg" alt="login_icon" />
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Navigation)
