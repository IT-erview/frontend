import { Link } from 'react-router-dom'

import 'views/common/layout/Footer.sass'

const Footer = () => {
  return (
    <footer>
      <div className={'footer-top'}>
        <div className={'footer-wrap'}>
          <div className={'footer-logo'}>
            <img src="/img/logo.svg" alt="logo" />
          </div>
          <ul className={'footer-menu'}>
            <li>
              <Link to="/">약관동의</Link>
            </li>
            <li>
              <Link to="/">문의</Link>
            </li>
            <li>
              <Link to="/">고객센터</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={'footer-bottom'}>
        <div className={'footer-wrap'}>
          <span className={'footer-office'}>2021 IT'erview</span>
          <ul className={'footer-information'}>
            <li>서울특별시 강남구 해산로 103길 면접빌딩 101호 잇터뷰</li>
            <li>대표 : 김문준</li>
            <li>Fax : 02 2593 4940</li>
            <li>Email : iterview.cs@gmail.com</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
