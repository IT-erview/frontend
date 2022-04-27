// react
import { useDispatch } from 'react-redux'
// util
import { getZerofilledNumber } from 'utils/util'
import { MAX_DISPLAYED_TAG_COUNT } from 'utils/config'
import { Tag } from 'utils/type'
// oauth
import { JWT_TOKEN } from 'constants/Oauth'
//style
import styles from 'views/common/question/Question.module.css'
// api
import { getMyAnswer } from 'api/answer'
// redux
import { setModalOpen } from 'modules/loginModal'

const Question = (props: {
  id: number
  number: number
  content: string
  tagList?: Array<Tag>
  answer?: string
  bookmark: boolean
  bookmarkCount: number
}) => {
  // todo: 전체적으로 적용필요
  // todo: questionId 수정으로 이동 가능
  let isRequesting = false
  const dispatch = useDispatch()
  const moveToQuestionDetail = () => {
    if (!JWT_TOKEN) {
      alert('로그인을 해주세요.')
      dispatch(setModalOpen(true))
    } else {
      if (isRequesting) return
      isRequesting = true
      getMyAnswer(props.id)
        .finally(() => {
          isRequesting = false
        })
        .then(() => {
          alert('문제에 대한 나의 답변이 없으면 다른 사람의 답변을 볼 수 없습니다. 답변 등록 페이지로 이동합니다.')
          window.open(`/AnswerRegister?question_id=${props.id}`, '', '_blank')
        })
        .catch(() => {
          window.open(`/QuestionDetail?question_id=${props.id}`)
        })
    }
  }

  return (
    <div>
      <button onClick={moveToQuestionDetail} className={styles.questionBox}>
        <div className={styles.questionInfo}>
          <div className={styles.questionNumber}>{getZerofilledNumber(props.number)}</div>
          <div className={styles.line}></div>
          <div className={styles.bookmarkSpace}>
            <img
              src={props.bookmark ? '../img/bookmark_true.png' : '../img/bookmark_false.png'}
              alt="questionBookmark"
              className={styles.bookmark}
            />
            <div className={styles.bookmarkCount}>
              <p className={styles.bookmarkCountText}>{props.bookmarkCount}</p>
            </div>
          </div>
        </div>
        <div className={styles.questionContent}>
          <h1 className={styles.questionTitle}>{props.content}</h1>
          <p className={styles.questionAnswer}>{props.answer ? props.answer : '(등록된 답변이 없습니다)'}</p>
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
