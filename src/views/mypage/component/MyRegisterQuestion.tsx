// react
import { useEffect, useState } from 'react'
// util
import { Question } from 'utils/type'
// style
import 'views/mypage/style/MyRegisterQuestion.sass'
// api
import { getMyQuestions } from 'api/question'
// component
import QuestionList from 'views/common/question/QuestionList'
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'
import MypageFilter from 'views/mypage/component/MyPageFilter'

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
      let questionList = await getMyQuestions(params)
      setQuestions(questionList.data)
    }
    initQuestions()
  }, [sort])

  return (
    <div className={'mypage-question-wrap'}>
      <MypageFilter />
      <div className={'mypage-register-question-title'}>
        <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
      </div>
      <QuestionList questions={questions} />
    </div>
  )
}

export default MyRegisterQuestion
