import 'css/QuizSolving.css'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Form, Input } from 'reactstrap'
import { useState } from 'react'
import QuizResult from 'components/QuizResult'
import { MAX_TEXT_CONTENTS_LENGTH } from 'common/config'
import { checkTextContentsLength } from 'common/util'
import { postQuizAnswer } from 'common/api'

const QuizSolving: React.FunctionComponent<{ quiz: any } & RouteComponentProps> = ({ quiz }: { quiz: any }) => {
  const [answerTextContents, setAnswerTextContents] = useState<string>('')
  const [quizAnswers, setQuizAnswers] = useState<
    Array<{
      content: any
      questionId: any
    }>
  >([])
  const [showResult, setShowResult] = useState<boolean>(false)
  const [quizIndex, setQuizIndex] = useState<number>(0)

  const nextQuestion = () => {
    if (checkTextContentsLength(answerTextContents)) {
      setQuizAnswers([...quizAnswers, { content: answerTextContents, questionId: quiz[quizIndex].id }])
      setAnswerTextContents('')
      setQuizIndex((prev) => prev + 1)
      if (quiz.length === quizIndex + 1) {
        submitQuizAnswer()
      }
    } else {
      window.alert('최소 20자 이상 입력해주세요')
    }
  }

  const submitQuizAnswer = () => {
    postQuizAnswer(quizAnswers)
    setShowResult(true)
  }

  return (
    <div>
      {showResult ? (
        <QuizResult quiz={quiz} />
      ) : (
        <div className="quiz-box">
          <Form>
            <div className="breadcrumbs">
              <img src="/img/LOGO1.png" alt="iterview-logo" />
              <span>테스트 문제 {'>'} </span>
              <span>인기 문제 {'>'} </span>
              <span className="subhead">문제 제목</span>
            </div>
            <div className="quiz-title">
              <img src="/img/figure1.png" alt="quiz-logo" />
              <span className="quiz-number">Quiz {quizIndex + 1}.</span>
              <span className="time-title">
                <img className="timer-img" src="/img/nav_icon5.png" alt="quiz-timer-img"></img>
                이번퀴즈 총 소요시간
                <span id="time">
                  <span id="hour">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>
                </span>
              </span>
            </div>
            <div className="quiz-contents-box">
              <h1 className="quiz-contents-title">문제 설명</h1>
              <h1 className="quiz-contents">{quiz[quizIndex].content}</h1>
            </div>
            <span
              id="answer-text-length"
              style={{ color: checkTextContentsLength(answerTextContents) ? 'black' : 'red' }}>
              ({answerTextContents.length}/{MAX_TEXT_CONTENTS_LENGTH})
            </span>
            <Input
              type="textarea"
              value={answerTextContents}
              maxLength={MAX_TEXT_CONTENTS_LENGTH}
              onChange={(e) => {
                setAnswerTextContents(e.target.value)
              }}
              id="quiz-contents"
              placeholder="답을 입력해주세요."
            />
          </Form>
          <div className="next-quiz">
            <button className="quiz-btn" onClick={() => nextQuestion()}>
              {quiz.length !== quizIndex + 1 ? '다음 문제로 넘어가기' : '퀴즈 종료하기'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default withRouter(QuizSolving)
