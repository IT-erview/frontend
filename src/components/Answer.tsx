// import 'css/Answer.css'
import { getZerofilledNumber } from 'common/util'
import { Tag } from 'common/type'
import styles from 'css/Answer.module.css'
import { MAX_DISPLAYED_TAG_COUNT } from 'common/config'

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

  return (
    <div>
      <button className={styles.questionBox}>
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
