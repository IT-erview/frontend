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
import MypageFilter from 'views/mypage/component/MyPageFilter'
import { useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import { filter } from 'modules/searchFilter'

const MyRegisterQuestion = () => {
  const [questions, setQuestions] = useState<Array<Question>>([])
  const filter = useSelector<ReducerType, filter>((state) => state.searchFilter)
  const tagList = filter.tags
    .filter((tag) => tag.isSelected)
    .map((tag) => tag.id)
    .toString()

  useEffect(() => {
    const initQuestions = async () => {
      let params = {
        sort: filter.sort,
        page: 0,
        size: 30,
        tagList: tagList,
      }
      let questionList = await getMyQuestions(params)
      setQuestions(questionList.data)
    }
    initQuestions()
  }, [tagList, filter])

  return (
    <div className={'mypage-question-wrap'}>
      <MypageFilter />
      <div className={'mypage-register-question-title'}></div>
      <QuestionList questions={questions} />
    </div>
  )
}

export default MyRegisterQuestion
