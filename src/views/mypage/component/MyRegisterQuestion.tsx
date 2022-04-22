import { useEffect, useState } from 'react'
import QuestionList from 'views/common/question/QuestionList'
import SortSelectBox, { Sort } from '../../common/form/SortSelectBox'
import { getMyQuestions } from 'utils/api'
import { Question } from 'utils/type'

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
