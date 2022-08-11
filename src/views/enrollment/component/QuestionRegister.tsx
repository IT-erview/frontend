// react
import { useState } from 'react'
import { Form, Input, Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
// util
import { MAX_TEXT_CONTENTS_LENGTH, MIN_TEXT_CONTENTS_LENGTH } from 'utils/config'
import { checkTextContentsLength } from 'utils/util'
import { MAX_DISPLAYED_TAG_COUNT } from 'utils/config'
import { TagSelectorItem } from 'utils/type'

// api
import { postQuestion } from 'api/question'

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

    let data = {
      content: questionTextContents,
      bookmarkCount: 0,
      tags: [selectedTag],
      depth: 1,
      expectedKeywords: [1],
      keywordId: 1,
      level: 1,
    }

    const result = await postQuestion(data).finally(() => {
      isRequesting = false
    })
    if (result.data) {
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
    <>
      {isRegistered ? (
        <div className={'register-complete'}>
          <div className={'register-complete-content-wrap'}>
            <div className={'register-complete-text'}>
              <p>문제 등록이 완료되었습니다!</p>
              <p>마이페이지로 돌아가 문제에 대한 답변을 작성해보세요.</p>
            </div>
            <div className={'register-complete-box'}>
              <span className={'complete-box-index'}>01</span>
              <p className={'complete-box-content'}>{questionTextContents}</p>
              <div className={'complete-box-tags-wrap'}>
                {questionTags &&
                  questionTags.map((tag, index) => {
                    return (
                      index < MAX_DISPLAYED_TAG_COUNT &&
                      tag.isSelected && (
                        <div className="question-box-tag" key={tag.id}>
                          {tag.name}
                        </div>
                      )
                    )
                  })}
              </div>
            </div>
          </div>
          <div className="btn-wrap">
            <button
              className="btn-go-home"
              onClick={() => {
                history.push('/')
              }}>
              홈으로 돌아가기
            </button>
            <button
              className="btn-go-mypage"
              onClick={() => {
                history.push('/MyPage/MyRegisterQuestion')
              }}>
              마이페이지로 가기
            </button>
          </div>
        </div>
      ) : (
        <div className={'question-register'}>
          <div className={'register-title-wrap'}>
            <h2 className={'register-title'}>문제 등록</h2>
          </div>
          <div className="register-tags-wrap">
            <h3>문제 종류 선택</h3>
            <div id="register-tags" className={'register-tags-list-wrap'}>
              {/* <TagSelector tags={questionTags} onTagSelect={onTagSelect} /> */}
              {questionTags.map((tag) => {
                return (
                  <button
                    className={`${tag.id === selectedTag ? 'selected' : ''} register-tag`}
                    key={tag.id}
                    onClick={() => onTagSelect(tag.id)}>
                    {tag.name}
                  </button>
                )
              })}
            </div>
          </div>
          <Form className={'register-form'}>
            <div className={'register-form-title-wrap'}>
              <h3>문제 작성</h3>
              <span
                id="text-counts"
                style={{ color: checkTextContentsLength(questionTextContents) ? '#a0a0a0' : 'red' }}>
                {questionTextContents.length} / {MAX_TEXT_CONTENTS_LENGTH}
              </span>
            </div>
            <Input
              type="textarea"
              value={questionTextContents}
              maxLength={MAX_TEXT_CONTENTS_LENGTH}
              onChange={(e) => {
                setQuestionTextContents(e.target.value)
              }}
              id="question-contents"
              className={'question-content'}
              placeholder="알고싶은 면접 문제를 입력해주세요."
            />
          </Form>
          <div className={'btn-wrap'}>
            <Button className={'btn-register'} onClick={registerQuestion}>
              등록하기
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default withRouter(QuestionRegister)
