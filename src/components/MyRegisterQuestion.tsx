// import 'css/MyRegisterQuestion.css'
import { useEffect, useState } from 'react'
import QuestionList from 'components/QuestionList'
import SortSelectBox, { Sort } from './SortSelectBox'
import { getMyQuestions } from 'common/api'
import { Question } from 'common/type'

const MyRegisterQuestion = () => {
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)
  const [questions, setQuestions] = useState<Array<Question>>([])
  useEffect(() => {
    const initQuestions = async () => {
      setQuestions(await getMyQuestions(sort))
    }
    initQuestions()
  }, [sort])

  return (
    <div className="mypage-register-question-question">
      <div className="mypage-register-question-title">
        <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
      </div>
      <QuestionList questions={questions} />
    </div>
  )
}

export default MyRegisterQuestion
