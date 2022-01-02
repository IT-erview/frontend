// todo: refactoring
import SetQuizOptions from 'components/SetQuizOptions'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import { QuizQuestion } from 'common/type'
import { useState, useEffect } from 'react'
import QuizSolving from 'components/QuizSolving'
import { useHistory } from 'react-router-dom'
import { useBeforeunload } from 'react-beforeunload'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import { setResetQuiz } from 'modules/resetQuiz'

const SetQuizOptionsPage = () => {
  // const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)
  const [quizzes, setQuizzes] = useState<QuizQuestion | null>(null)
  const history = useHistory()
  const resetQuiz = useSelector<ReducerType, boolean>((state) => state.resetQuiz)
  const dispatch = useDispatch()

  useBeforeunload((event) => {
    if (quizzes) event.preventDefault()
  })

  useEffect(() => {
    if (quizzes) {
      const unblock = history.block((location, action) => {
        if (action === 'POP' || action === 'PUSH') {
          const confirm = window.confirm('뒤로 가시겠습니까? 변경사항이 저장되지 않을 수 있습니다.')
          if (confirm) {
            dispatch(setResetQuiz(true))
          }
        }
      })
      return () => {
        unblock()
      }
    }
  }, [quizzes, history, dispatch])

  useEffect(() => {
    if (resetQuiz) {
      setQuizzes(null)
      dispatch(setResetQuiz(false))
    }
  }, [resetQuiz, dispatch])

  return (
    <>
      <Navigation />
      {quizzes ? <QuizSolving quiz={quizzes} /> : <SetQuizOptions setQuizzes={setQuizzes} />}
      <Footer />
    </>
  )
}
export default SetQuizOptionsPage
