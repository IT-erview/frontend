import { useEffect, useState } from 'react'
import Answer from 'views/common/answer/Answer'
import { getAnswers } from 'api/answer'
import { Answer as AnswerType, Question } from 'utils/type'
import { useParams } from 'react-router-dom'
import { getQuestion } from 'api/question'

const QuestionDetail = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const keywordToggle = () => setDropdownOpen((prev) => !prev)
  const arrow = '/img/quiz_keyword_dropdown.png'
  const [moreAnswer, setMoreAnswer] = useState<boolean>(false)

  const questionId = useParams<{ id?: string }>()
  const [answersList, setAnswersList] = useState<Array<AnswerType>>([])
  const [questionData, setQuestionData] = useState<Question>()

  const [answerLoading, setAnswerLoading] = useState<Boolean>(false)
  const getQuestionData = async () => {
    const data = await getQuestion(Number(questionId.id))
    if (data.data.content) {
      setQuestionData(questionData)
    }
  }

  useEffect(() => {
    getQuestionData()
  })

  const getAnswer = async () => {
    if (answersList.length === 0) {
      let params = {
        page: 0,
        sort: 'popular,desc',
        size: 10,
      }
      const answers = await getAnswers(Number(questionId.id), params)
      if (answers.data.content) {
        setAnswersList(answers.data.content)
        setAnswerLoading(true)
      }
    }
  }

  const moreHideBtn = (hitsLength: number, more: boolean) => {
    if (hitsLength > 3) {
      return more ? (
        <>
          {'숨기기'} <img src="img/hide_btn.png" alt="hideBtn" className={'icon-hide'} />
        </>
      ) : (
        <>
          {'더보기'} <img src="img/more_btn.png" alt="moreBtn" className={'icon-more'} />
        </>
      )
    } else return null
  }

  const otherAnswers = () => {
    if (answerLoading === false) {
      getAnswer()
      return
    }
    if (answersList.length <= 0)
      return (
        <div className={'other-answer-wrap'}>
          <p className={'other-answer-none'}> 다른 사람의 답변이 없습니다.</p>
        </div>
      )
    return (
      <div className={'other-answer-wrap'}>
        {answersList.map((answersList, idx) => {
          if (!moreAnswer && idx >= 3) return null
          return (
            <Answer
              key={answersList.id}
              id={answersList.questionId}
              number={idx + 1}
              content={'내용'}
              tagList={[]}
              answer={answersList.content}
              likeCount={answersList.liked}
              like={answersList.like}
            />
          )
        })}
        {answersList.length > 3 ? (
          <div className={'btn-wrap'}>
            <button onClick={() => setMoreAnswer((prev) => !prev)} className={'btn-more'}>
              {moreHideBtn(answersList.length, moreAnswer)}
            </button>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <section className="content-wrap">
      <div className="container">
        <article className="question-content">
          <h2>문제 내용</h2>
          <div className="question-information-box">
            <div className="question-information">
              <p className="question-title">멀티프로세스는 무엇이고, 왜 사용할까요?</p>
              <p className="question-description">{questionData?.content}</p>
            </div>
            <div className="question-handler">
              <button className="btn-bookmark">
                <img src={'../img/bookmark_true.png'} alt="questionBookmark" className={'question-bookmark-icon'} />
                245
              </button>
              <span className="bar"></span>
              <span className="question-tag">java</span>
            </div>
          </div>
          <div className={'keyword-box-wrap'}>
            <div className={'keyword-compact'}>
              <h3 className={'keyword-title'}>핵심 키워드 보기</h3>
              <button className={'btn-keyword-dropdown'} onClick={keywordToggle}>
                <img src={arrow} alt="dropdownArrow" className={`${dropdownOpen ? 'active' : ''} icon-down-arrow`} />
              </button>
            </div>
            <div className={`${dropdownOpen ? 'show' : ''} keyword-box`}>
              {dropdownOpen ? <span className={'core-keyword'}>keyword</span> : null}
            </div>
          </div>
        </article>
        <article className="my-answer">
          <div className="my-title-wrap">
            <h3>내가 작성한 답변</h3>
            <button className="btn-like">
              <img src={'../img/bookmark_true.png'} alt="questionBookmark" className={'question-bookmark-icon'} />
              643
            </button>
          </div>
          <div className="my-content-wrap">
            <p>
              하나의 프로그램을 여러개의 프로세스로 나누어서 실해하는 것으로 , cpu 유휴시간을 줄여서 성능 이점을 성능
              성능 이점을 얻으려는 것. 한 프로세스에서 문제가 발생해도 타 프로세스는 지장없다. 다만 프로세스의 컨텍스트
              스위칭이 오버해ㅔ드가 크다
            </p>
          </div>
        </article>
        <article className="other-answer">
          <div className="other-title-wrap">
            <h3>다른사람이 작성한 답변</h3>
          </div>
          <div className="other-content-wrap">{otherAnswers()}</div>
        </article>
      </div>
    </section>
  )
}

export default QuestionDetail
