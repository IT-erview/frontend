// react
import { useEffect, useState } from 'react'
import { Form, Input } from 'reactstrap'
import { withRouter } from 'react-router-dom'
// util
import { MAX_TEXT_CONTENTS_LENGTH, MIN_TEXT_CONTENTS_LENGTH } from 'utils/config'
import { checkTextContentsLength, isNumeric } from 'utils/util'
// style
import 'views/quiz/style/AnswerRegister.css'
// api
import { postAnswer } from 'api/answer'
import { getQuestion } from 'api/question'

const getParsedParameters = () => {
  const questionIdParameters = new URLSearchParams(window.location.search).get('question_id')
  return {
    questionId: isNumeric(questionIdParameters) ? Number(questionIdParameters) : undefined,
  }
}

const AnswerRegister = () => {
  const [answerTextContents, setAnswerTextContents] = useState<string>('')
  const questionId = getParsedParameters().questionId
  const [questionContent, setQuestionContent] = useState<string>('')

  useEffect(() => {
    const getQuestionContent = async () => {
      if (questionId) {
        const question = await getQuestion(questionId)
        if (question.data) setQuestionContent(question.data.content)
      }
    }
    getQuestionContent()
  }, [questionId])

  if (questionId === undefined) return <></>

  let isRequesting = false

  const registerAnswer = async () => {
    if (!checkTextContentsLength(answerTextContents)) {
      window.alert(`최소 ${MIN_TEXT_CONTENTS_LENGTH}자 이상 입력해주세요`)
      return
    }
    if (isRequesting) return
    isRequesting = true
    let data = {
      questionId: questionId,
      content: answerTextContents,
    }
    const result = await postAnswer(data).finally(() => {
      isRequesting = false
    })
    if (result.data) {
      window.alert('답변이 등록되었습니다.')
      window.open(`/QuestionDetail?question_id=${questionId}`)
      window.close()
    } else {
      window.alert('답변이 등록되지 않았습니다.')
    }
  }

  return (
    <div>
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
            <span className="quiz-number">답변 등록</span>
          </div>
          <div className="quiz-contents-box">
            <h1 className="quiz-contents-title">문제 설명</h1>
            <h1 className="quiz-contents">{questionContent}</h1>
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
        <button className="quiz-btn" onClick={registerAnswer}>
          답변등록
        </button>
      </div>
    </div>
  )
}

export default withRouter(AnswerRegister)
