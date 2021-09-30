import 'css/QuestionRegister.css'
import Tags from 'components/Tags'
import { useState } from 'react'
import { Form, Input, Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { MAX_TEXT_CONTENTS_LENGTH, MIN_TEXT_CONTENTS_LENGTH } from 'common/config'
import { checkTextContentsLength } from 'common/util'
import { postQuestion } from 'common/api'
import { MAX_DISPLAYED_TAG_COUNT } from 'common/config'

const getQuestionTags = (): Array<string> => {
  const storageQuestionTags = localStorage.getItem('questionRegiTag')
  if (typeof storageQuestionTags === 'string') return JSON.parse(storageQuestionTags)
  return []
}

const QuestionRegister = ({ history }: { history: any }) => {
  const [questionTextContents, setQuestionTextContents] = useState<string>('')
  const [isRegistered, setRegistered] = useState<boolean>(false)
  const questionTags = getQuestionTags()

  let isRequesting = false

  const registerQuestion = async () => {
    if (!checkTextContentsLength(questionTextContents)) {
      window.alert(`최소 ${MIN_TEXT_CONTENTS_LENGTH}자 이상 입력해주세요`)
      return
    }
    if (isRequesting) return
    isRequesting = true
    const result = await postQuestion(questionTextContents, questionTags).finally(() => {
      isRequesting = false
    })
    if (result) {
      window.alert('문제가 등록되었습니다.')
      setRegistered(true)
    } else {
      window.alert('문제가 등록되지 않았습니다.')
    }
  }

  return (
    <div className="question-register">
      <div className="question-register-info-detail">
        알고싶은
        <br />
        문제를 작성하고
        <br />
        태그를 걸어주세요!
      </div>
      {isRegistered ? (
        <>
          <div className="question-register-after">
            <div className="question-register-after-content">
              <span>
                문제 등록이 완료되었습니다!
                <br />
                마이페이지로 돌아가 문제에 대한 답변을 작성해보세요.
              </span>
              <div className="question-register-after-question">
                <h1>01</h1>
                <h2>{questionTextContents}</h2>
                {questionTags &&
                  questionTags.map((tag, index) => {
                    return (
                      index < MAX_DISPLAYED_TAG_COUNT && (
                        <div className="question-register-after-tags" key={index}>
                          {tag}
                        </div>
                      )
                    )
                  })}
              </div>
              <button
                className="question-register-after-btn2"
                onClick={() => {
                  history.push('/')
                }}>
                홈으로 돌아가기
              </button>
              <button
                className="question-register-after-btn1"
                onClick={() => {
                  history.push('/MyPage/MyRegisterQuestion')
                }}>
                마이페이지로 가기
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="question-register-input">
            <Form>
              <h1>문제 입력</h1>
              <div className="question-register-hr" />
              <span id="text-counts" style={{ color: checkTextContentsLength(questionTextContents) ? 'black' : 'red' }}>
                ( {questionTextContents.length} / {MAX_TEXT_CONTENTS_LENGTH} )
              </span>
              <Input
                type="textarea"
                value={questionTextContents}
                maxLength={MAX_TEXT_CONTENTS_LENGTH}
                onChange={(e) => {
                  setQuestionTextContents(e.target.value)
                }}
                id="question-contents"
                placeholder="알고싶은 면접 문제를 입력해주세요."
              />
            </Form>
            <div className="question-register-tags">
              <h2>문제 태그 선택</h2>
              <div className="question-register-hr2" />
              <Tags page="question-register" id="register-tags" />
              <Button onClick={registerQuestion}>등록하기</Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default withRouter(QuestionRegister)
