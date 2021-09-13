import 'css/Answer.css'
import { getZerofilledNumber } from 'common/util'
import { answerLike } from 'common/api'

const Answer = (props: { id: number; number: number; title: string; answer: string; like: number }) => {
  const like = () => {
    answerLike(
      props.id,
      () => {
        window.location.reload()
        window.alert('좋아요 되었습니다.')
      },
      () => window.alert('이미 좋아요한 답변입니다.'),
    )
  }

  return (
    <div className="each-answer">
      <div className="answer-card">
        <div className="answer-number">{getZerofilledNumber(props.number)}</div>
        <div className="answer-content">
          <h1>{props.title}</h1>
          <h5>{props.answer}</h5>
        </div>
        <button onClick={like}>좋아요! {props.like}</button>
      </div>
    </div>
  )
}

export default Answer
