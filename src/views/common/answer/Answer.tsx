// import 'css/Answer.css'
// oauth
import { JWT_TOKEN } from 'constants/Oauth'

// util
import { getZerofilledNumber } from 'utils/util'
import { Tag } from 'utils/type'
import { MAX_DISPLAYED_TAG_COUNT } from 'utils/config'

// style
import styles from 'views/common/answer/Answer.module.css'

// redux
import { useDispatch } from 'react-redux'
import { setModalOpen } from 'modules/loginModal'

// api
import { getMyAnswer } from 'api/answer'

const Answer = (props: {
  id: number
  number: number
  content: string
  answer: string
  likeCount: number
  like: boolean
  tagList?: Array<Tag>
}) => {
  // const like = () => {
  //   likeAnswer(
  //     props.id,
  //     () => {
  //       window.location.reload()
  //       window.alert('좋아요 되었습니다.')
  //     },
  //     () => window.alert('이미 좋아요한 답변입니다.'),
  //   )
  // }
  const dispatch = useDispatch()
  let isRequesting = false

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
      <button className={styles.questionBox} onClick={moveToQuestionDetail}>
        <div className={styles.questionInfo}>
          <div className={styles.questionNumber}>{getZerofilledNumber(props.number)}</div>
          <div className={styles.line}></div>
          <div className={styles.likeSpace}>
            {/* <button onClick={like}>좋아요! {props.like}</button> */}
            <img
              src={props.like ? 'img/like_true.png' : 'img/like_false.png'}
              alt="answerLike"
              className={styles.like}
            />
            <div className={styles.likeCount}>
              <p>{props.likeCount}</p>
            </div>
          </div>
        </div>
        <div className={styles.questionContent}>
          <h1 className={styles.questionTitle}>{props.content}</h1>
          <p className={styles.questionAnswer}>{props.answer}</p>
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

export default Answer
