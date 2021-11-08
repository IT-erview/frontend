import 'css/MyRegisterQuestion.css'
import MyPageProfile from 'components/MyPageProfile'
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
    <div className="mypage-register-question">
      <MyPageProfile />
      <div className="mypage-register-question-question">
        <div className="mypage-register-question-title">
          <span>
            <img src="/img/mypage_icon1.png" alt="mypage-register-quesiton-icon" />
            내가 등록한 문제
          </span>
          <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
        </div>
        <QuestionList questions={questions} />
      </div>
    </div>
  )
}

export default MyRegisterQuestion
