// import 'css/QuizSolving.css'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useState } from 'react'
import { MAX_TEXT_CONTENTS_LENGTH } from 'common/config'
import { checkTextContentsLength } from 'common/util'
import { postQuizAnswers } from 'common/api'
import { QuizQuestion } from 'common/type'
import styles from 'css/Quiz.module.css'
import { Form, Input } from 'reactstrap'

const QuizSolving: React.FunctionComponent<{ quiz: QuizQuestion } & RouteComponentProps> = ({
  quiz,
}: {
  quiz: QuizQuestion
}) => {
  const [answerTextContents, setAnswerTextContents] = useState<string>('')
  const [showResult, setShowResult] = useState<boolean>(false)
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

  const keywordToggle = () => setDropdownOpen((prev) => !prev)

  const nextQuestion = () => {
    if (checkTextContentsLength(answerTextContents)) {
      console.log(answerTextContents)
      const res = postQuizAnswers({ content: answerTextContents, questionId: quiz.id })
      console.log(res)
      setAnswerTextContents('')
      // submitQuizAnswer()
    } else {
      window.alert('최소 20자 이상 입력해주세요')
    }
  }

  // const submitQuizAnswer = () => {
  //   postQuizAnswers(quizAnswer)
  //   setShowResult(true)
  // }

  return (
    <div>
      {showResult ? (
        // <QuizResult quizzes={quizzes} />
        <>zz</>
      ) : (
        <>
          <div className={styles.solvingBanner}>
            <img className={styles.solvingBannerImg} src="img/quiz_solving_img.png" alt="quiz_solving_banner_img" />
            <div className={styles.solvingBannerText}>
              테스트 문제
              <img src="img/quiz_solving_arrow.png" className={styles.solvingBannerArrow} alt="quiz_solving_arrow" />
              인기 문제
              <img src="img/quiz_solving_arrow.png" className={styles.solvingBannerArrow} alt="quiz_solving_arrow" />
              <span className={styles.solvingBannerTag}>{quiz.tagList[0].tagTitle}</span>
              <p className={styles.questionTitle}>{quiz.content}</p>
            </div>
          </div>
          <div className={styles.body}>
            <p className={styles.answerTitle}>
              답변 작성
              <span
                className={styles.answerTextLength}
                style={{ color: checkTextContentsLength(answerTextContents) ? '#a0a0a0' : 'red' }}>
                {answerTextContents.length} / {MAX_TEXT_CONTENTS_LENGTH}
              </span>
            </p>
            <div className={styles.quizHorizontalLine} />
            <Form className={styles.answerForm}>
              <Input
                className={styles.answerInput}
                type="textarea"
                value={answerTextContents}
                maxLength={MAX_TEXT_CONTENTS_LENGTH}
                onChange={(e) => {
                  setAnswerTextContents(e.target.value)
                }}
                placeholder="답변을 작성해주세요. '다음 문제로 넘어가기' 버튼을 누르시면 답변은 자동 저장됩니다."
              />
            </Form>
            <div className={styles.coreKeywordBox}>
              <span className={styles.coreKeywordTitle}>핵심 키워드 보기</span>
              <button className={styles.keywordDropdownBtn} onClick={keywordToggle}>
                <img
                  src="img/quiz_keyword_dropdown.png"
                  alt="dropdownArrow"
                  className={dropdownOpen ? styles.keywordDropdownToggle : styles.keywordDropdown}
                />
              </button>
            </div>
            <div className={dropdownOpen ? styles.keywordDropdownOpen : styles.keywordDropdownClose}>
              <div className={styles.dropdownKeywords}>
                {dropdownOpen ? <div className={styles.coreKeyword}>{quiz.coreKeyword.name}</div> : null}
              </div>
            </div>
            <div className={styles.quizBtn}>
              <button className={styles.otherAnswers} onClick={() => nextQuestion()}>
                다른 사람의 답변
              </button>
              <button className={styles.nextQuestion} onClick={nextQuestion}>
                다음 문제로 넘어가기
              </button>
              <button className={styles.exit} onClick={() => setShowResult(true)}>
                종료
              </button>
            </div>
          </div>
          <div className="next-quiz"></div>
        </>
      )}
    </div>
  )
}

export default withRouter(QuizSolving)
