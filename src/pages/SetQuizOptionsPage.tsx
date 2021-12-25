// todo: refactoring
import SetQuizOptions from 'components/SetQuizOptions'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import { QuizQuestion } from 'common/type'
import { useState, useEffect } from 'react'
import QuizSolving from 'components/QuizSolving'
import { useHistory } from 'react-router-dom'

const SetQuizOptionsPage = () => {
  // const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)
  const [quizzes, setQuizzes] = useState<QuizQuestion | null>(null)
  const history = useHistory()

  useEffect(() => {
    if (quizzes) {
      const unblock = history.block('지금 떠나시면 모든 데이터가 초기화됩니다. 떠나시겠습니까?')
      return () => {
        unblock()
      }
    }
  }, [quizzes, history])
  return (
    <>
      <Navigation />
      {quizzes ? <QuizSolving quizzes={quizzes} /> : <SetQuizOptions setQuizzes={setQuizzes} />}
      <Footer />
    </>
  )
}
export default SetQuizOptionsPage
