// react
import { useEffect, useState } from 'react'
// util
import { Question } from 'utils/type'
// api
import { getMyQuestions } from 'api/question'
// component
import QuestionList from 'views/common/question/QuestionList'
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'

const MyRegisterQuestion = () => {
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)
  const [questions, setQuestions] = useState<Array<Question>>([])

  useEffect(() => {
    const initQuestions = async () => {
      let params = {
        sort: `${sort},desc`,
        page: 0,
        size: 30,
      }
      setQuestions(await getMyQuestions(params))
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
