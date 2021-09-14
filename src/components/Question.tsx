// todo: 이렇게 막아봤자 그냥 이동 가능하다.
import { getMyAnswer } from 'common/api'
import { Answer, Tag } from 'common/type'
import { getZerofilledNumber } from 'common/util'
import 'css/Question.css'

const MAX_DISPLAYED_TAG_COUNT = 3

const Question = (props: { id: number; number: number; content: string; tagList?: Array<Tag>; answer?: Answer }) => {
  let isRequesting = false
  const moveToQuestionDetail = async () => {
    if (isRequesting) return
    isRequesting = true
    const myAnswer = await getMyAnswer(props.id)
    console.log(myAnswer)
    if (!myAnswer) {
      alert('문제에 대한 나의 답변이 없으면 다른 사람의 답변을 볼 수 없습니다. 답변 등록 페이지로 이동합니다.')
      window.open(`/AnswerRegister`, '', '_blank')
    } else {
      window.open(`/QuestionDetail?question_id=${props.id}`)
    }
    isRequesting = false
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
