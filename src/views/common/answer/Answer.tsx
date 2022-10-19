// react
// oauth
import { JWT_TOKEN } from 'constants/Oauth'
// util
import { getZerofilledNumber } from 'utils/util'
import { Tag } from 'utils/type'
import { MAX_DISPLAYED_TAG_COUNT } from 'utils/config'
// style
import 'views/common/answer/Answer.sass'
// redux
import { Link } from 'react-router-dom'
import { useState } from 'react'
// api
import { likeAnswer } from 'api/answer'

const alarmLike = (
  id: number,
  e: React.MouseEvent<HTMLElement>,
  isLiked: boolean,
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>,
  setLikeCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  e.preventDefault()
  if (isLiked === false) {
    setIsLiked(true)
    setLikeCount((current) => current + 1)
    likeAnswer(id)
    alert('좋아요 되었습니다!')
  }
  // else{
  //   setIsLiked(false)
  //   setLikeCount((current) => current - 1)
  //   likeAnswer(id)
  //   alert('좋아요 되었습니다!')
  // }
}

const Answer = (props: {
  id: number
  number: number
  content: string
  answer: string
  likeCount: number
  like: boolean
  tagList?: Array<Tag>
}) => {
  const [isLiked, setIsLiked] = useState(props.like)
  console.log(`${props.id}: ${props.like}`)
  const [likeCount, setLikeCount] = useState(props.likeCount)

  return (
    <Link to={`/QuestionDetail/${props.id}`}>
      <div className={'answer-box'}>
        <div className={'answer-info-wrap'}>
          <div className={'answer-index-wrap'}>
            <span className={'answer-index'}>{getZerofilledNumber(props.number)}</span>
          </div>
          <div
            className={'answer-like-wrap'}
            onClick={JWT_TOKEN ? (e) => alarmLike(props.id, e, isLiked, setIsLiked, setLikeCount) : undefined}>
            <img
              src={isLiked ? 'img/like_true.png' : 'img/like_false.png'}
              className={'answer-like-icon'}
              alt="answerLike"
            />
            <p className={'answer-like-count'}>{likeCount}</p>
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
