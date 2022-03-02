// todo: refactoring
import styles from 'css/QuizResult.module.css'
import { QuizAnswer, TagSelectorItem } from 'common/type'
import { useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import Footer from 'components/Footer'
import Navigation from 'components/Navigation'
import Question from 'components/Question'

const QuizResultPage = () => {
  const quizzes = useSelector<ReducerType, Array<QuizAnswer>>((state) => state.quizQuestions)
  const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)
  const userImgUrl = localStorage.getItem('userImgUrl') as string

  console.log(quizzes)

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
                    <span className={styles.countLabel}>
                      <em>오늘 푼 문제</em>
                    </span>
                    <span className={styles.countNumber}>
                      <em>13</em>
                    </span>
                  </li>
                  <li>
                    <span className={`${styles.countLabel} ${styles.totalCountLabel}`}>누적 푼 문제</span>
                    <span className={styles.countNumber}>183</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.quizTags} ${styles.quizBoxCommon}`}>
              <h4>선택된 문제 종류</h4>
              <div className={styles.tagList}>
                {quizTags.map((tag: TagSelectorItem) => {
                  return (
                    tag.isSelected && (
                      <button key={tag.id} className={styles.tagBtn}>
                        {tag.name}
                      </button>
                    )
                  )
                })}
              </div>
            </div>
          </div>
          <div className={styles.solvedQuiz}>
            <div className={styles.solvedQuizTitle}>
              <h3>풀었던 문제</h3>
            </div>
            <div className={styles.solvedQuizList}>
              {quizzes.map((quiz: QuizAnswer, idx) => {
                return (
                  <Question
                    key={quiz.question.id}
                    id={quiz.question.id}
                    number={idx + 1}
                    content={quiz.question.content}
                    tagList={quiz.question.tagList}
                  />
                )
              })}
              {/* {quizzes.map((quiz: QuizAnswer, idx) => {
                return (
                  <div className={styles.answerBox} key={quiz.question.id}>
                    <div className={styles.answerBoxInfo}>
                      <span className={styles.answerIndex}>{idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}</span>
                      <div className={styles.answerBookmarkWrap}>
                        <span
                          className={styles.answerBookmark}
                          style={{ backgroundImage: 'url(/img/bookmark_false.png)' }}></span>
                        <span className={styles.answerBookmarkCount}>125</span>
                      </div>
                    </div>
                    <div className={styles.answerTextWrap}>
                      <h4 className={styles.answerTitle}>{quiz.question.content}</h4>
                      <p className={styles.answerContent}>{quiz.answer}</p>
                    </div>
                    <div className={styles.questionTagList}>
                      {quiz.question.tagList.map((tag) => {
                        return <span className={styles.questionTag}>{tag.tagTitle}</span>
                      })}
                    </div>
                  </div>
                )
              })} */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default QuizResultPage
