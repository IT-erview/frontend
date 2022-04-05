// import 'css/MyRegisterQuestion.css'
import { useEffect, useState } from 'react'
import QuestionList from 'components/QuestionList'
import SortSelectBox, { Sort } from './SortSelectBox'
import { getMyQuestions } from 'common/api'
import { Question } from 'common/type'
import styles from 'css/Mypage.module.css'

const MyRegisterQuestion = () => {
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)
  const [questions, setQuestions] = useState<Array<Question>>([])
  const userName = localStorage.getItem('userName') as string

  useEffect(() => {
    const initQuestions = async () => {
      setQuestions(await getMyQuestions(sort))
    }
    initQuestions()
  }, [sort])

  const setQuizOptionsImg = '/img/quiz_img.png'

  return (
    <div className="mypage-register-question">
      <div className={styles.banner}>
        <img src={setQuizOptionsImg} alt="question_banner_img" className={styles.bannerImg} />

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
      <div className="mypage-register-question-question">
        <div className="mypage-register-question-title">
          <span>
            <img src="/img/mypage_icon1.png" alt="mypage-register-quesiton-icon" />
            내가 등록한 문제
          </span>
          <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
        </div>
        <QuestionList questions={questions} />
      </div>
    </div>
  )
}

export default MyRegisterQuestion
