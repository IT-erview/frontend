// todo: refactoring
import SetQuizOptions from 'components/SetQuizOptions'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import { QuizAnswer } from 'common/type'
import { useEffect } from 'react'
import QuizSolving from 'components/QuizSolving'
import { useHistory } from 'react-router-dom'
import { useBeforeunload } from 'react-beforeunload'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import { setQuizQuestionsReset } from 'modules/quizQuestions'
import { NextQuiz, setNextQuestionInit } from 'modules/nextQuestion'

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
        console.log(location)
        if (location.pathname !== '/QuizResult' && (action === 'POP' || action === 'PUSH')) {
          const confirm = window.confirm('뒤로 가시겠습니까? 변경사항이 저장되지 않을 수 있습니다.')
          if (confirm) {
            dispatch(setQuizQuestionsReset())
          }
        }
      })
      return () => {
        unblock()
      }
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
      {quizzes.length > 0 && status !== NextQuiz.QUIT ? (
        <QuizSolving quiz={quizzes[quizzes.length - 1].question} />
      ) : (
        <SetQuizOptions />
      )}
      <Footer />
    </>
  )
}
export default SetQuizOptionsPage
