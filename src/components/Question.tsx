import { getMyAnswer } from 'common/api'
import { Answer, Tag } from 'common/type'
import { getZerofilledNumber } from 'common/util'
import { MAX_DISPLAYED_TAG_COUNT } from 'common/config'
import 'css/Question.css'

const Question = (props: { id: number; number: number; content: string; tagList?: Array<Tag>; answer?: Answer }) => {
  // todo: 전체적으로 적용필요
  // todo: questionId 수정으로 이동 가능
  let isRequesting = false
  const moveToQuestionDetail = async () => {
    if (isRequesting) return
    isRequesting = true
    const myAnswer = await getMyAnswer(props.id).finally(() => (isRequesting = false))
    if (!myAnswer) {
      alert('문제에 대한 나의 답변이 없으면 다른 사람의 답변을 볼 수 없습니다. 답변 등록 페이지로 이동합니다.')
      window.open(`/AnswerRegister?question_id=${props.id}`, '', '_blank')
    } else {
      window.open(`/QuestionDetail?question_id=${props.id}`)
    }
  }

  return (
    <div className="each-question">
      <button onClick={moveToQuestionDetail}>
        <div className="question-number">{getZerofilledNumber(props.number)}</div>
        <div className="question-content">
          {props.content}
          <br />
          <span>{props.answer ? props.answer.content : '(등록된 답변이 없습니다)'}</span>
        </div>
        <div className="question-tag">
          {props.tagList &&
            props.tagList.map((tag, index) => {
              return (
                index < MAX_DISPLAYED_TAG_COUNT && (
                  <div className="question-tags" key={index}>
                    {tag.tagTitle}
                  </div>
                )
              )
            })}
        </div>
      </button>
    </div>
  )
}

export default Question
