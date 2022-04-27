// react
import { useEffect, useState } from 'react'
// util
import { isNumeric } from 'utils/util'
// api
import { addBookmark } from 'api/bookmark'
import { getQuestion } from 'api/question'
// component
import QuestionDetail from 'views/quiz/component/QuestionDetail'

const getParsedParameters = () => {
  const questionIdParameters = new URLSearchParams(window.location.search).get('question_id')
  return {
    questionId: isNumeric(questionIdParameters) ? Number(questionIdParameters) : undefined,
  }
}

const QuestionDetailPage = () => {
  const questionId = getParsedParameters().questionId
  const [questionContent, setQuestionContent] = useState<string>('')

  useEffect(() => {
    const getQuestionContent = () => {
      if (questionId) {
        getQuestion(questionId).then((res: any) => {
          if (res.data) {
            setQuestionContent(res.data.content)
          }
        })
      }
      // if (questionId) {
      //   const question = await getQuestion(questionId)
      //   if (question) setQuestionContent(question.content)
      // }
    }
    getQuestionContent()
  }, [questionId])

  if (questionId === undefined) return <></>
  let isRequesting = false

  const bookmarkIt = async () => {
    if (isRequesting) return
    isRequesting = true
    addBookmark(questionId)
      .finally(() => {
        isRequesting = false
      })
      .then((res: any) => {
        if (res.data) {
          alert('북마크 되었습니다.')
        } else {
          alert('이미 북마크한 문제입니다.')
        }
      })
      .catch(() => {
        alert('오류가 발생하였습니다.')
      })
    // const result = await addBookmark(questionId).finally(() => {
    //   isRequesting = false
    // })
    // window.alert(result ? '북마크 되었습니다.' : '이미 북마크한 문제입니다.')
  }
  return (
    <>
      <div className="question-detail-top">
        <div className="question-detail-bar">
          <img src="/img/iterview-logo.jpg" alt="logo" />
        </div>
        <div id="top-hr-line" />
        <div className="question-detail-title">
          <img src="/img/figure1.png" alt="question-detail-title-icon" />
          <span>{questionContent}</span>
          <button onClick={bookmarkIt}>북마크로 문제 저장하기</button>
        </div>
      </div>
      <div className="body">
        <QuestionDetail questionId={questionId} />
      </div>
    </>
  )
}
export default QuestionDetailPage
