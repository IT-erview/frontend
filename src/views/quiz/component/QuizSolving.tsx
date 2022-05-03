// react
import { useCallback, useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Form, Input } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
// util
import { MAX_TEXT_CONTENTS_LENGTH } from 'utils/config'
import { checkTextContentsLength } from 'utils/util'
import { QuizQuestion, Answer as AnswerType } from 'utils/type'
// style
import 'views/quiz/css/QuizSolving.sass'
// redux
import { NextQuiz, setNextQuestionInit } from 'modules/nextQuestion'
import { setQuizAnswers, setQuizQuestions } from 'modules/quizQuestions'
// api
import { getAnswers, postQuizAnswers } from 'api/answer'
// component
import ExitAnswerModal from 'views/quiz/component/ExitAnswer'
import NextModal from 'views/quiz/component/NextModal'
import Answer from 'views/common/answer/Answer'

const QuizSolving: React.FunctionComponent<{ quiz: QuizQuestion } & RouteComponentProps> = ({
  quiz,
}: {
  quiz: QuizQuestion
}) => {
  const [current, setCurrent] = useState<QuizQuestion>(quiz)
  const [answerTextContents, setAnswerTextContents] = useState<string>('')
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [isOpenModal, setOpenModal] = useState<boolean>(false)
  const [isOpenNextModal, setOpenNextModal] = useState<boolean>(false)
  const [answersList, setAnswersList] = useState<Array<AnswerType>>([])
  const [moreAnswer, setMoreAnswer] = useState<boolean>(false)
  const [showAnswers, setShowAnswers] = useState<boolean>(false)
  const nextQuizOption = useSelector<ReducerType, NextQuiz>((state) => state.nextQuestion)
  const [answerLoading, setAnswerLoading] = useState<Boolean>(false)
  const dispatch = useDispatch()

  const getAnswer = async () => {
    if (answersList.length === 0) {
      let params = {
        page: 0,
        sort: 'popular,desc',
        size: 10,
      }
      const answers = await getAnswers(current.id, params)
      if (answers.data.content) {
        setAnswersList(answers.data.content)
        setAnswerLoading(true)
      }
    }
  }
  const getNextQuestion = useCallback(async () => {
    if (!checkTextContentsLength(answerTextContents)) window.alert('답변을 20자 이상 작성해주세요.')
    else {
      let data = {
        questionId: current.id,
        content: answerTextContents,
      }
      let params = {
        type: nextQuizOption,
      }
      const nextQuestion = await postQuizAnswers(params, data)
      dispatch(setQuizAnswers(answerTextContents))
      if (nextQuestion.data) {
        setDropdownOpen(false)
        dispatch(setQuizQuestions(nextQuestion.data))
        setShowAnswers(false)
        setCurrent(nextQuestion.data)
      }
      setAnswerTextContents('')
    }
  }, [nextQuizOption, answerTextContents, dispatch, current.id, setCurrent, setDropdownOpen, setShowAnswers])

  useEffect(() => {
    if (nextQuizOption !== NextQuiz.INIT) {
      getNextQuestion()
      window.scrollTo(0, 0)
      dispatch(setNextQuestionInit())
    }
  }, [nextQuizOption, getNextQuestion, dispatch])

  const keywordToggle = () => setDropdownOpen((prev) => !prev)

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal)
  }, [isOpenModal])

  const onClickToggleNextModal = useCallback(() => {
    setOpenNextModal(!isOpenNextModal)
  }, [isOpenNextModal])

  const showOtherAnswers = useCallback(() => {
    setShowAnswers(!showAnswers)
  }, [showAnswers])

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

  const expectedKeywords = current.expectedKeywordList
    ? current.expectedKeywordList.map((keyword) => {
        return (
          <span key={keyword.id} className={'core-keyword'}>
            {keyword.name}
          </span>
        )
      })
    : '기대 키워드가 없습니다.'

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
        <p className={'other-answer-title'}>다른 사람의 답변</p>
        {answersList.map((answersList, idx) => {
          if (!moreAnswer && idx >= 3) return null
          return (
            <Answer
              key={answersList.id}
              id={answersList.questionId}
              number={idx + 1}
              content={current.content}
              tagList={current.tagList}
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

  // @ts-ignore
  return (
    <div>
      <div className={`${isOpenModal || isOpenNextModal ? 'blur' : ''} quiz-solving-wrap`}>
        <div className={'banner-wrap'} style={{ backgroundImage: `url(img/quiz_solving_img.png)` }}>
          <div className={'container'}>
            <div className={'breadcrumb-wrap'}>
              <span className={'breadcrumb-item'}>테스트 문제</span>
              <img src="img/quiz_solving_arrow.png" className={'icon-arrow'} alt="quiz_solving_arrow" />
              <span className={'breadcrumb-item'}>인기 문제</span>
              <img src="img/quiz_solving_arrow.png" className={'icon-arrow'} alt="quiz_solving_arrow" />
              <span className={'banner-tag'}>{current.tagList[0].tagTitle}</span>
            </div>
            <h1 className={'question-title'}>{current.content}</h1>
          </div>
        </div>
        <div className={'content-wrap'}>
          <div className="container">
            <div className={'content-title-wrap'}>
              <h2>답변 작성</h2>
              <span
                className={'text-counts'}
                style={{ color: checkTextContentsLength(answerTextContents) ? '#a0a0a0' : 'red' }}>
                {answerTextContents.length} / {MAX_TEXT_CONTENTS_LENGTH}
              </span>
            </div>
            <Form className={'answer-form'}>
              <Input
                className={'answer-content'}
                type="textarea"
                value={answerTextContents}
                maxLength={MAX_TEXT_CONTENTS_LENGTH}
                onChange={(e) => {
                  setAnswerTextContents(e.target.value)
                }}
                placeholder="답변을 작성해주세요. '다음 문제로 넘어가기' 버튼을 누르시면 답변은 자동 저장됩니다."
              />
            </Form>
            <div className={'keyword-box-wrap'}>
              <div className={'keyword-compact'}>
                <h3 className={'keyword-title'}>핵심 키워드 보기</h3>
                <button className={'btn-keyword-dropdown'} onClick={keywordToggle}>
                  <img
                    src="img/quiz_keyword_dropdown.png"
                    alt="dropdownArrow"
                    className={`${dropdownOpen ? 'active' : ''} icon-down-arrow`}
                  />
                </button>
              </div>
              <div className={`${dropdownOpen ? 'show' : ''} keyword-box`}>
                {dropdownOpen ? expectedKeywords : null}
              </div>
            </div>
            <div className={'btn-wrap'}>
              <button className={'btn-common btn-show-answer'} onClick={showOtherAnswers}>
                다른 사람의 답변
              </button>
              <button className={'btn-common btn-next'} onClick={onClickToggleNextModal}>
                다음 문제로 넘어가기
              </button>
              <button className={'btn-common btn-exit'} onClick={onClickToggleModal}>
                종료
              </button>
            </div>
            {showAnswers ? otherAnswers() : null}
          </div>
        </div>
      </div>
      <div className="next-quiz"></div>
      {isOpenModal && <ExitAnswerModal onClickToggleModal={onClickToggleModal} />}
      {isOpenNextModal && <NextModal onClickToggleNextModal={onClickToggleNextModal} />}
      {(isOpenModal || isOpenNextModal) && <div className={'dim'}></div>}
    </div>
  )
}

export default withRouter(QuizSolving)
