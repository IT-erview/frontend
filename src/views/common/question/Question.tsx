// react
// oauth
import { JWT_TOKEN } from 'constants/Oauth'
// util
import { getZerofilledNumber } from 'utils/util'
import { MAX_DISPLAYED_TAG_COUNT } from 'utils/config'
import { Tag } from 'utils/type'
// style
import 'views/common/question/Question.sass'
// redux
// api
import { addBookmark } from 'api/bookmark'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const alarmBookmark = (
  id: number,
  e: React.MouseEvent<HTMLElement>,
  isBookmarked: boolean,
  setIsBookmarked: React.Dispatch<React.SetStateAction<boolean>>,
  setBookmarkCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  e.preventDefault()
  if (isBookmarked === false) {
    setIsBookmarked(true)
    setBookmarkCount((current) => current + 1)
    addBookmark(id)
    alert('북마크 되었습니다!')
    // } else {
    //   isBookmarked = false
    //   // 아직 api 수정이 되지 않음
    //   //deleteBookmark(id)
    //   alert('북마크가 취소되었습니다!')
    // }
  }
}

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
  const [isBookmarked, setIsBookmarked] = useState(props.bookmark)
  const [bookmarkCount, setBookmarkCount] = useState(props.bookmarkCount)
  return (
    <Link to={`/QuestionDetail/${props.id}`}>
      <div className={'question-box'}>
        <div className={'question-info-wrap'}>
          <div className={'question-index-wrap'}>
            <span className={'question-index'}>{getZerofilledNumber(props.number)}</span>
          </div>
          <div
            className={'question-bookmark-wrap'}
            onClick={
              JWT_TOKEN ? (e) => alarmBookmark(props.id, e, isBookmarked, setIsBookmarked, setBookmarkCount) : undefined
            }>
            <img
              src={isBookmarked ? '../img/bookmark_true.png' : '../img/bookmark_false.png'}
              alt="questionBookmark"
              className={'question-bookmark-icon'}
            />
            <p className={'question-bookmark-count'}>{bookmarkCount}</p>
          </div>
        </div>
        <div className={'question-content-wrap'}>
          <h3 className={'question-title'}>{props.content}</h3>
          <p className={'question-answer'}>{props.answer ? props.answer : '(등록된 답변이 없습니다)'}</p>
          <div className={'question-tag-wrap'}>
            {props.tagList &&
              props.tagList.map((tag, index) => {
                return (
                  index < MAX_DISPLAYED_TAG_COUNT && (
                    <span className={'question-tag'} key={index}>
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

export default Question
