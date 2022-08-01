// react
import { useDispatch } from 'react-redux'
// oauth
import { JWT_TOKEN } from 'constants/Oauth'
// util
import { getZerofilledNumber } from 'utils/util'
import { MAX_DISPLAYED_TAG_COUNT } from 'utils/config'
import { Tag } from 'utils/type'
// style
import 'views/common/question/Question.sass'
// redux
import { setModalOpen } from 'modules/loginModal'
// api
import { getMyAnswer } from 'api/answer'
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
  let isRequesting = false
  const dispatch = useDispatch()
  const moveToQuestionDetail = async () => {
    if (!JWT_TOKEN) {
      alert('로그인을 해주세요.')
      dispatch(setModalOpen(true))
    } else {
      if (isRequesting) return
      isRequesting = true
      const myAnswer = await getMyAnswer(props.id).finally(() => (isRequesting = false))
      if (!myAnswer.data) {
        alert('문제에 대한 나의 답변이 없으면 다른 사람의 답변을 볼 수 없습니다. 답변 등록 페이지로 이동합니다.')
        window.open(`/AnswerRegister?question_id=${props.id}`, '', '_blank')
      } else {
        window.open(`/QuestionDetail?question_id=${props.id}`)
      }
    }
  }

  return (
    <Link to={`/QuestionDetail/${props.id}`}>
      <div className={'question-box'} onClick={moveToQuestionDetail}>
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
