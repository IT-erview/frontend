// react
import { useEffect, useState } from 'react'
// util
import { Question } from 'utils/type'
// style
import 'views/mypage/style/MyRegisterQuestion.sass'
// api
import { getMyQuestions } from 'api/question'
// component
import MypageFilter from 'views/mypage/component/MyPageFilter'
import { useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import { filter } from 'modules/searchFilter'
import QuestionList from 'views/common/question/QuestionList'
import MypagePagination from './MypagePagination'

const MyRegisterQuestion = () => {
  const [questions, setQuestions] = useState<Array<Question>>([])
  const filter = useSelector<ReducerType, filter>((state) => state.searchFilter)
  const [page, setPage] = useState(1)
  const [totalElement, setTotalElement] = useState(0)
  const tagList = filter.tags
    .filter((tag) => tag.isSelected)
    .map((tag) => tag.id)
    .toString()

  useEffect(() => {
    const initQuestions = async () => {
      let params = {
        sort: filter.sort,
        page: page - 1,
        size: 5,
        tagList: tagList,
      }
      let questionList = await getMyQuestions(params)
      setQuestions(questionList.data)
      // 임시로 설정
      setTotalElement(10)
    }
    initQuestions()
  }, [tagList, filter, page])

  return (
    <div className={'mypage-question-wrap'}>
      <MypageFilter />
      <div className={'mypage-register-question-title'}></div>
      <QuestionList questions={questions} page={page} />
      <div className={'paging-wrap'}>
        <MypagePagination page={page} setPage={setPage} totalElement={totalElement} />
      </div>
    </div>
  )
}

export default MyRegisterQuestion
