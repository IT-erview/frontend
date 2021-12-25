// todo: refactoring
import SetQuizOptions from 'components/SetQuizOptions'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import { QuizQuestion } from 'common/type'
import { useState } from 'react'
import QuizSolving from 'components/QuizSolving'

const SetQuizOptionsPage = () => {
  // const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)
  const [quizzes, setQuizzes] = useState<QuizQuestion | null>(null)

  return (
    <>
      <Navigation />
      {quizzes ? <QuizSolving quizzes={quizzes} /> : <SetQuizOptions setQuizzes={setQuizzes} />}
      <Footer />
    </>
  )
}
export default SetQuizOptionsPage
