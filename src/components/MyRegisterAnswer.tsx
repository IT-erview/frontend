import 'css/MyRegisterAnswer.css'
import MyPageProfile from 'components/MyPageProfile'
import { useEffect, useState } from 'react'
import InfiniteAnswerList from 'components/InfiniteAnswerList'
import SortSelectBox, { Sort } from './SortSelectBox'
import { Answer } from 'common/type'
import { getMyAnswers } from 'common/api'

const MyRegisterAnswer = () => {
  const ROWS_PER_PAGE = 4
  const [sort, setSort] = useState<Sort>(Sort.LIKED)
  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState<Array<Answer>>([])

  useEffect(() => {
    const initAnswers = async () => {
      const fetchedAnswer = await getMyAnswers(sort, page, ROWS_PER_PAGE)
      setAnswers(fetchedAnswer)
    }
    initAnswers()
  }, [sort, page])

  return (
    <div className="mypage-register-answer">
      <MyPageProfile />
      <div className="mypage-register-answer-question">
        <div className="mypage-register-answer-title">
          <span>
            <img src="/img/mypage_icon2.png" alt="mypage-register-answer-icon" />
            내가 등록한 답변
          </span>
          <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
        </div>
        <InfiniteAnswerList answers={answers} onScrollEnd={() => {}} />
      </div>
    </div>
  )
}

export default MyRegisterAnswer
