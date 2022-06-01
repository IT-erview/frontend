// todo: refactoring
// react
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useBeforeunload } from 'react-beforeunload'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
// util
import { QuizAnswer } from 'utils/type'
// redux
import { setQuizQuestionsReset } from 'modules/quizQuestions'
import { NextQuiz, setNextQuestionInit } from 'modules/nextQuestion'
// component
import SetQuizOptions from 'views/quiz/component/SetQuizOptions'
import Navigation from 'views/common/layout/Navigation'
import Footer from 'views/common/layout/Footer'
import QuizSolving from 'views/quiz/component/QuizSolving'

const SetQuizOptionsPage = () => {
  const quizzes = useSelector<ReducerType, Array<QuizAnswer>>((state) => state.quizQuestions)
  const history = useHistory()
  const dispatch = useDispatch()
  const status = useSelector<ReducerType, NextQuiz>((state) => state.nextQuestion)

  useBeforeunload((event) => {
    if (quizzes) event.preventDefault()
  })

  useEffect(() => {
    if (quizzes.length > 0) {
      const unblock = history.block((location, action) => {
        if (location.pathname !== '/QuizResult' && (action === 'POP' || action === 'PUSH')) {
          const confirm = window.confirm('페이지를 이동하시겠습니까? 퀴즈가 초기화 됩니다.')
          if (confirm) dispatch(setQuizQuestionsReset())
          else return false
        }
      })
      return () => unblock()
    }
  }, [quizzes, history, dispatch])

  useEffect(() => {
    if (status === NextQuiz.QUIT) {
      dispatch(setQuizQuestionsReset())
      dispatch(setNextQuestionInit())
    }
  }, [dispatch, status])

  return (
    <>
      <Navigation />
      <main className="quiz-wrap">
        {quizzes.length > 0 && status !== NextQuiz.QUIT ? (
          <QuizSolving quiz={quizzes[quizzes.length - 1].question} />
        ) : (
          <SetQuizOptions />
        )}
      </main>
      <Footer />
    </>
  )
}
export default SetQuizOptionsPage
