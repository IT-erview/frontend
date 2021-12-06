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
  like: number
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
          <div className={styles.like}>(이미지) 643</div>
          <div className={styles.bookmark}>(이미지) 245</div>
        </div>
        <div className={styles.questionContent}>
          <h1 className={styles.questionTitle}>{props.content}</h1>
          <p className={styles.questionAnswer}>{props.answer ? props.content : '(등록된 답변이 없습니다)'}</p>
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
    // <div className="each-answer">
    //   <div className="answer-card">
    //     <div className="answer-number">{getZerofilledNumber(props.number)}</div>
    //     <div className="answer-content">
    //       <h1>{props.title}</h1>
    //       <h5>{props.answer}</h5>
    //     </div>
    //     <button onClick={like}>좋아요! {props.like}</button>
    //   </div>
    // </div>
  )
}

export default Answer
