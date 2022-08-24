// react
// oauth
// util
import { getZerofilledNumber } from 'utils/util'
import { MAX_DISPLAYED_TAG_COUNT } from 'utils/config'
import { Tag } from 'utils/type'
// style
import 'views/common/question/Question.sass'
// redux
// api
import { Link } from 'react-router-dom'

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

  return (
    <Link to={`/QuestionDetail/${props.id}`}>
      <div className={'question-box'}>
        <div className={'question-info-wrap'}>
          <div className={'question-index-wrap'}>
            <span className={'question-index'}>{getZerofilledNumber(props.number)}</span>
          </div>
          <div className={'question-bookmark-wrap'}>
            <img
              src={props.bookmark ? '../img/bookmark_true.png' : '../img/bookmark_false.png'}
              alt="questionBookmark"
              className={'question-bookmark-icon'}
            />
            <p className={'question-bookmark-count'}>{props.bookmarkCount}</p>
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
