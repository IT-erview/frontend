// import 'css/QuizSolving.css'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { MAX_TEXT_CONTENTS_LENGTH } from 'common/config'
import { checkTextContentsLength } from 'common/util'
import { getAnswers, postQuizAnswers } from 'common/api'
import { QuizQuestion, Answer as AnswerType } from 'common/type'
import styles from 'css/Quiz.module.css'
import { Form, Input } from 'reactstrap'
import ExitAnswerModal from 'components/ExitAnswer'
import NextModal from 'components/NextModal'
import Answer from './Answer'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import { NextQuiz, setNextQuestionInit } from 'modules/nextQuestion'
import { setQuizAnswers, setQuizQuestions } from 'modules/quizQuestions'

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
      const answers = await getAnswers(current.id, 'popular', 0)
      if (answers) {
        setAnswersList(answers)
        setAnswerLoading(true)
      }
    }
  }
  const getNextQuestion = useCallback(async () => {
    if (!checkTextContentsLength(answerTextContents)) window.alert('답변을 20자 이상 작성해주세요.')
    else {
      const nextQuestion = await postQuizAnswers(
        { content: answerTextContents, questionId: current.id },
        nextQuizOption,
      )
      dispatch(setQuizAnswers(answerTextContents))
      if (nextQuestion) {
        dispatch(setQuizQuestions(nextQuestion))
        setCurrent(nextQuestion)
      }
      setAnswerTextContents('')
    }
  }, [nextQuizOption, answerTextContents, dispatch, current.id, setCurrent])

  useEffect(() => {
    if (nextQuizOption !== NextQuiz.INIT) {
      getNextQuestion()
      dispatch(setNextQuestionInit())
    }
  }, [nextQuizOption, getNextQuestion, dispatch])

  const keywordToggle = () => setDropdownOpen((prev) => !prev)

  const moreHideBtn = (hitsLength: number, more: boolean) => {
    if (hitsLength > 3) {
      return more ? (
        <>
          {'숨기기'} <img src="img/hide_btn.png" alt="hideBtn" className={styles.moreHideArrow} />
        </>
      ) : (
        <>
          {'더보기'} <img src="img/more_btn.png" alt="moreBtn" className={styles.moreHideArrow} />
        </>
      )
    } else return null
  }

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal)
  }, [isOpenModal])

  const onClickToggleNextModal = useCallback(() => {
    setOpenNextModal(!isOpenNextModal)
  }, [isOpenNextModal])

  const showOtherAnswers = useCallback(() => {
    setShowAnswers(!showAnswers)
  }, [showAnswers])

  const expectedKeywords = current.expectedKeywordList
    ? current.expectedKeywordList.map((keyword) => {
        return (
          <div key={keyword.id} className={styles.coreKeyword}>
            {keyword.name}
          </div>
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
        <div className={styles.otherAnswersBox}>
          <p className={styles.otherAnswerNone}> 다른 사람의 답변이 없습니다.</p>
        </div>
      )
    return (
      <div className={styles.otherAnswersBox}>
        <p className={styles.otherAnswerTitle}>다른 사람의 답변</p>
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
          <div className={styles.more}>
            <button onClick={() => setMoreAnswer((prev) => !prev)} className={styles.moreHideBtn}>
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
      <div className={isOpenModal || isOpenNextModal ? styles.blur : styles.normal}>
        <div className={styles.solvingBanner}>
          <img className={styles.solvingBannerImg} src="img/quiz_solving_img.png" alt="quiz_solving_banner_img" />
          <div className={styles.solvingBannerText}>
            테스트 문제
            <img src="img/quiz_solving_arrow.png" className={styles.solvingBannerArrow} alt="quiz_solving_arrow" />
            인기 문제
            <img src="img/quiz_solving_arrow.png" className={styles.solvingBannerArrow} alt="quiz_solving_arrow" />
            <span className={styles.solvingBannerTag}>{current.tagList[0].tagTitle}</span>
            <p className={styles.questionTitle}>{current.content}</p>
          </div>
        </div>
        <div className={styles.body}>
          <p className={styles.answerTitle}>
            답변 작성
            <span
              className={styles.answerTextLength}
              style={{ color: checkTextContentsLength(answerTextContents) ? '#a0a0a0' : 'red' }}>
              {answerTextContents.length} / {MAX_TEXT_CONTENTS_LENGTH}
            </span>
          </p>
          <div className={styles.quizHorizontalLine} />
          <Form className={styles.answerForm}>
            <Input
              className={styles.answerInput}
              type="textarea"
              value={answerTextContents}
              maxLength={MAX_TEXT_CONTENTS_LENGTH}
              onChange={(e) => {
                setAnswerTextContents(e.target.value)
              }}
              placeholder="답변을 작성해주세요. '다음 문제로 넘어가기' 버튼을 누르시면 답변은 자동 저장됩니다."
            />
          </Form>
          <div className={styles.coreKeywordBox}>
            <span className={styles.coreKeywordTitle}>기대 키워드 보기</span>
            <button className={styles.keywordDropdownBtn} onClick={keywordToggle}>
              <img
                src="img/quiz_keyword_dropdown.png"
                alt="dropdownArrow"
                className={dropdownOpen ? styles.keywordDropdownToggle : styles.keywordDropdown}
              />
            </button>
          </div>
          <div className={dropdownOpen ? styles.keywordDropdownOpen : styles.keywordDropdownClose}>
            <div className={styles.dropdownKeywords}>{dropdownOpen ? expectedKeywords : null}</div>
          </div>
          <div className={styles.quizBtn}>
            <button className={styles.otherAnswers} onClick={showOtherAnswers}>
              다른 사람의 답변
            </button>
            <button className={styles.nextQuestion} onClick={onClickToggleNextModal}>
              다음 문제로 넘어가기
            </button>
            <button className={styles.exit} onClick={onClickToggleModal}>
              종료
            </button>
          </div>
        </div>
      </div>
      <div className="next-quiz"></div>
      {showAnswers ? otherAnswers() : null}
      {isOpenModal && <ExitAnswerModal onClickToggleModal={onClickToggleModal} />}
      {isOpenNextModal && <NextModal onClickToggleNextModal={onClickToggleNextModal} />}
      {(isOpenModal || isOpenNextModal) && <div className={styles.dim}></div>}
    </div>
  )
}

export default withRouter(QuizSolving)
