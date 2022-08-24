// react
//oauth
// util
import { getZerofilledNumber } from 'utils/util'
import { Tag } from 'utils/type'
import { MAX_DISPLAYED_TAG_COUNT } from 'utils/config'
// style
import 'views/common/answer/Answer.sass'
// redux
import { Link } from 'react-router-dom'
// api

const Answer = (props: {
  id: number
  number: number
  content: string
  answer: string
  likeCount: number
  like: boolean
  tagList?: Array<Tag>
}) => {
  return (
    <Link to={`/QuestionDetail/${props.id}`}>
      <div className={'answer-box'}>
        <div className={'answer-info-wrap'}>
          <div className={'answer-index-wrap'}>
            <span className={'answer-index'}>{getZerofilledNumber(props.number)}</span>
          </div>
          <div className={'answer-like-wrap'}>
            {/* <button onClick={like}>좋아요! {props.like}</button> */}
            <img
              src={props.like ? 'img/like_true.png' : 'img/like_false.png'}
              className={'answer-like-icon'}
              alt="answerLike"
            />
            <p className={'answer-like-count'}>{props.likeCount}</p>
          </div>
        </div>
        <div className={'answer-content-wrap'}>
          <h3 className={'answer-title'}>{props.content}</h3>
          <p className={'question-answer'}>{props.answer}</p>
          <div className={'answer-tag-wrap'}>
            {props.tagList &&
              props.tagList.map((tag, index) => {
                return (
                  index < MAX_DISPLAYED_TAG_COUNT && (
                    <span className={'answer-tag'} key={index}>
                      {tag.tagTitle}
                    </span>
                  )
                )
              })}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Answer
