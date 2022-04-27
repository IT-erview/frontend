// react
import { useState } from 'react'
// style
import styles from 'views/mypage/css/Mypage.module.css'
//component
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
    <div className="mypage-question">
      <div className={styles.banner}>
        <img src={mypageImg} alt="question_banner_img" className={styles.bannerImg} />

        <p className={styles.bannerTitle}>마이페이지</p>
        <p className={styles.bannerContent}>지금까지 풀었던 문제들을 한 번에 만나보세요!</p>
        <div className={styles.bannerInfo}>
          <p className={styles.bannerInfoText}>
            환영합니다
            <br />
            {userName} 님
          </p>
        </div>
      </div>
      <UserInfo />
      <div className="mypage-question">
        <div className="mypage-question-title">
          <span>
            {/* <img src="/img/mypage_icon1.png" alt="mypage-register-quesiton-icon" />
            내가 등록한 문제 */}
            <MyPageNavigation mypageType={mypageType} setMypageType={setMypageType} />
          </span>
        </div>
        {showQuestions()}
      </div>
    </div>
  )
}

export default MyPage
