// todo: refactoring carousel로 쓰일 것인지?
import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'views/common/layoutlayout/MainCarousel.css'
import { useHistory } from 'react-router-dom'

const MainCarousel = () => {
  const history = useHistory()

  return (
    <div id="carousel-slide">
      {/* <img id="deem" src="/img/navigation-deem.png" /> */}

      <div id="background">
        {/* <img id="deem" src="/img/navigation-deem.png" alt="deem" /> */}
        <div id="background-info">
          {/* <img className="space1" src="/img/main_img3.png" alt="" /> */}
          <div className="iterview-info">
            <h1>IT'erview를 소개합니다.</h1>
            <span>
              IT'erview는 개발자들의 면접을 효율적으로 도와주는 서비스입니다.
              <br />
              체계적인 면접학습을 경험해보세요.
            </span>
          </div>
          <button
            className="main-quiz-btn"
            onClick={() => {
              history.push('/SetQuizOptions')
            }}>
            퀴즈풀기
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainCarousel
