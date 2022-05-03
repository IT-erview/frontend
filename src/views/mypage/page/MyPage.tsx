// react
import { useState } from 'react'

// style
import 'views/mypage/css/Mypage.sass'

// component
import UserInfo from 'views/common/user/UserInfo'
import MyPageNavigation, { MyPageInquireType } from 'views/mypage/component/MyPageNavigation'
import MyAnswers, { MyAnswerType } from 'views/mypage/component/MyAnswers'
import MyBookmarkQuestion from 'views/mypage/component/MyBookmarkQuestion'
import MyRegisterQuestion from 'views/mypage/component/MyRegisterQuestion'

const MyPage = () => {
  const userName = localStorage.getItem('userName') as string
  const [mypageType, setMypageType] = useState<MyPageInquireType>(MyPageInquireType.REGISTERED_QUESTION)

  const mypageImg = '/img/quiz_img.png'

  const showQuestions = () => {
    switch (mypageType) {
      case MyPageInquireType.REGISTERED_QUESTION:
        return <MyRegisterQuestion />
      case MyPageInquireType.REGISTERED_ANSWER:
        return <MyAnswers type={MyAnswerType.ALL} />
      case MyPageInquireType.LIKED:
        return <MyAnswers type={MyAnswerType.LIKED} />
      case MyPageInquireType.BOOKMARKED:
        return <MyBookmarkQuestion />
    }
  }
  return (
    <div className={'mypage-wrap'}>
      <section className={'banner-wrap'} style={{ backgroundImage: `url(${mypageImg})` }}>
        <div className="container">
          <h1>마이페이지</h1>
          <p>지금까지 풀었던 문제들을 한 번에 만나보세요!</p>
          <div className={'mypage-tip-wrap'}>
            <div className={'mypage-tip-box'}>
              환영합니다
              <br />
              {userName} 님
            </div>
          </div>
        </div>
      </section>
      <section className="content-wrap">
        <div className="container">
          <UserInfo />
          {/* <img src="/img/mypage_icon1.png" alt="mypage-register-quesiton-icon" />
          내가 등록한 문제 */}
          <MyPageNavigation mypageType={mypageType} setMypageType={setMypageType} />
          {showQuestions()}
        </div>
      </section>
    </div>
  )
}

export default MyPage
