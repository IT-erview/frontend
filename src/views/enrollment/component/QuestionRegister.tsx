import 'views/enrollment/css/QuestionRegister.css'
import { useState } from 'react'
import { Form, Input, Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { MAX_TEXT_CONTENTS_LENGTH, MIN_TEXT_CONTENTS_LENGTH } from 'utils/config'
import { checkTextContentsLength } from 'utils/util'
import { postQuestion } from 'api/question'
import { MAX_DISPLAYED_TAG_COUNT } from 'utils/config'
import { useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import { TagSelectorItem } from 'utils/type'

// 디자인 적용 전 데이터 등록을 위한 기능만 구현
const QuestionRegister = ({ history }: { history: any }) => {
  const [questionTextContents, setQuestionTextContents] = useState<string>('')
  const [isRegistered, setRegistered] = useState<boolean>(false)
  const questionTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.registerTags)
  const [selectedTag, setSelectedTag] = useState<number>(-1)

  let isRequesting = false
  const registerQuestion = async () => {
    if (!checkTextContentsLength(questionTextContents)) {
      window.alert(`최소 ${MIN_TEXT_CONTENTS_LENGTH}자 이상 입력해주세요`)
      return
    }
    if (selectedTag === -1) {
      window.alert(`태그를 선택해주세요.`)
    }
    if (isRequesting) return
    isRequesting = true
    const result = await postQuestion(questionTextContents, selectedTag).finally(() => {
      isRequesting = false
    })
    if (result) {
      window.alert('문제가 등록되었습니다.')
      setRegistered(true)
    } else {
      window.alert('문제가 등록되지 않았습니다.')
    }
  }

  const onTagSelect = (tagId: number) => {
    // questionTags.map((tag) => {
    //   if (tag.isSelected === true && tag.id !== tagId) {
    //     console.log(tag.name)
    //     dispatch(setRegisterTagSelected({ tagId, isSelected: false }))
    //     return tag
    //   }
    // })
    // dispatch(setRegisterTagSelected({ tagId, isSelected }))
    setSelectedTag(tagId)
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
                      index < MAX_DISPLAYED_TAG_COUNT &&
                      tag.isSelected && (
                        <div className="question-register-after-tags" key={tag.id}>
                          {tag.name}
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
              <div id="register-tags">
                {/* <TagSelector tags={questionTags} onTagSelect={onTagSelect} /> */}
                {questionTags.map((tag) => {
                  return (
                    <button
                      className={tag.id === selectedTag ? 'selectedTag' : 'deselectedTag'}
                      key={tag.id}
                      onClick={() => onTagSelect(tag.id)}>
                      {tag.name}
                    </button>
                  )
                })}
              </div>
              <Button onClick={registerQuestion}>등록하기</Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default withRouter(QuestionRegister)
