// todo: refactoring
import styles from 'css/QuizResult.module.css'
// import { TagSelectorItem } from 'common/type'
// import { useSelector } from 'react-redux'
// import { ReducerType } from 'modules/rootReducer'
import Footer from 'components/Footer'
import Navigation from 'components/Navigation'

const QuizResultPage = () => {
  /*const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)*/
  const userImgUrl = localStorage.getItem('userImgUrl') as string
  return (
    <>
      <Navigation />
      <div className={styles.quizResult}>
        <div className={styles.titleArea} style={{ background: 'url(/img/quiz_img.png)' }}>
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
        <div className={styles.container}>
          <div className={styles.quizResultBox}>
            <div className={`${styles.quizUserInfo} ${styles.quizBoxCommon}`}>
              <div className={styles.quizUser}>
                <div className={styles.imageWrap}>
                  <img src={userImgUrl} alt="profile" className={styles.profile} />
                </div>
                <div className={styles.userInfoText}>
                  <p className={styles.userName}>{localStorage.getItem('userName')}</p>
                  <p className={styles.userEmail}>{localStorage.getItem('userEmail')}</p>
                </div>
              </div>
              <div className={styles.quizCount}>
                <ul>
                  <li>
                    <span className={styles.countLabel}>오늘 푼 문제</span>
                    <span className={styles.countNumber}>13</span>
                  </li>
                  <li>
                    <span className={styles.countLabel}>누적 푼 문제</span>
                    <span className={styles.countNumber}>183</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.quizTags} ${styles.quizBoxCommon}`}>
              <h4>선택된 문제 종류</h4>
              <hr className="hr2" />
              {/*{quizTags.map((tag: TagSelectorItem) => {
                return (
                  tag.isSelected && (
                    <button key={tag.id} className="tag-btn">
                      {tag.name}
                    </button>
                  )
                )
              })}*/}
              <button type="button" className="btn-tag">
                javascript
              </button>
              <button type="button" className="btn-tag">
                java
              </button>
              <button type="button" className="btn-tag">
                프로그래밍 언어
              </button>
              <button type="button" className="btn-tag">
                프로그래밍 언어
              </button>
              <button type="button" className="btn-tag">
                프로그래밍 언어
              </button>
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
      </div>
      <Footer />
    </>
  )
}

export default QuizResultPage
