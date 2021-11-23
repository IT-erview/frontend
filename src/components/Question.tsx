import { getMyAnswer } from 'common/api'
import { Answer, Tag } from 'common/type'
import { getZerofilledNumber } from 'common/util'
import { MAX_DISPLAYED_TAG_COUNT } from 'common/config'
import styles from 'css/Question.module.css'

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
    <div>
      <button onClick={moveToQuestionDetail} className={styles.questionBox}>
        <div className={styles.questionInfo}>
          <div className={styles.questionNumber}>{getZerofilledNumber(props.number)}</div>
          <div className={styles.line}></div>
          <div className={styles.like}>(이미지) 643</div>
          <div className={styles.bookmark}>(이미지) 245</div>
        </div>
        <div className={styles.questionContent}>
          <h1 className={styles.questionTitle}>{props.content}</h1>
          <p className={styles.questionAnswer}>{props.answer ? props.answer.content : '(등록된 답변이 없습니다)'}</p>
        </div>
        <div className={styles.questionTags}>
          {props.tagList &&
            props.tagList.map((tag, index) => {
              return (
                index < MAX_DISPLAYED_TAG_COUNT && (
                  <span className={styles.questionTag} key={index}>
                    {tag.tagTitle}
                  </span>
                )
              )
            })}
        </div>
      </button>
    </div>
  )
}

export default Question
