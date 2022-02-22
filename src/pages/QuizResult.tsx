// todo: refactoring
import styles from 'css/QuizResult.module.css'
import { TagSelectorItem } from 'common/type'
import { useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import Footer from 'components/Footer'
import Navigation from 'components/Navigation'

const QuizResultPage = () => {
  const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)

  return (
    <>
      <Navigation />
      <div className={styles.quizResult}>
        <div className={styles.titleArea}>
          <img src="/img/quiz_img.png" className={styles.titleImg} alt="question_banner_img" />
          <h2 className={styles.title}>면접문제 학습</h2>
          <p className={styles.subTitle}>
            아직도 암기식으로 면접을 준비하시나요?
            <br />
            체계적으로 전략적으로 학습해보세요!
          </p>
          <div className={styles.badge}>
            푼 문제를 <br />
            확인해주세요
          </div>
        </div>
        <div className={styles.quizResultBox}>
          <div className={styles.quizUserInfo}>
            <h4>{localStorage.getItem('userName')}</h4>
            <hr className="hr" />
            <h6>문제당 평균 시간</h6>
            <span>02:50</span>
            <h6>좋아요</h6>
            <span>50</span>
            <h6>퀴즈로 푼 문제</h6>
            <span>170</span>
          </div>
          <div className={styles.quizTags}>
            <h4>퀴즈 태그</h4>
            <hr className="hr2" />
            {quizTags.map((tag: TagSelectorItem) => {
              return (
                tag.isSelected && (
                  <button key={tag.id} className="tag-btn">
                    {tag.name}
                  </button>
                )
              )
            })}
          </div>
          <div className={styles.quizTimeInfo}>
            <h4>소요시간</h4>
            <hr className="hr3" />
            <h6>총 소요시간</h6>
            <span>00:00:00</span>
            <h6>문제당 소요시간</h6>
            <span>00:00:00</span>
          </div>
        </div>
        <div className={styles.solvedQuiz}>
          <div className={styles.solvedQuizTitle}>
            <span>풀었던 문제</span>
            <div className="hr4" />
          </div>
          <div className={styles.solvedQuizList}></div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default QuizResultPage
