// react
import { useDispatch } from 'react-redux'
//oauth
import { JWT_TOKEN } from 'constants/Oauth'
// util
import { getZerofilledNumber } from 'utils/util'
import { Tag } from 'utils/type'
import { MAX_DISPLAYED_TAG_COUNT } from 'utils/config'
// style
import 'views/common/answer/Answer.sass'
// redux
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
    <>
      <div className={'answer-box'} onClick={moveToQuestionDetail}>
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
    </>
  )
}

export default Answer
