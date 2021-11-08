import 'css/MyBookmarkQuestion.css'
import MyPageProfile from 'components/MyPageProfile'
import { useEffect, useState } from 'react'
import QuestionList from 'components/QuestionList'
import SortSelectBox, { Sort } from './SortSelectBox'
import { getBookmarks } from 'common/api'
import { Question } from 'common/type'

const MyBookmarkQuestion = () => {
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)
  const [questions, setQuestions] = useState<Array<Question>>([])

  useEffect(() => {
    const initQuestions = async () => {
      setQuestions(await getBookmarks(sort, false))
    }
    initQuestions()
  }, [sort])

  return (
    <div className="mypage-register-bookmark">
      <MyPageProfile />
      <div className="mypage-register-bookmark-question">
        <div className="mypage-register-bookmark-title">
          <span>
            <img src="/img/mypage_icon4.png" alt="mypage-register-bookmark-icon" />
            내가 북마크한 문제
          </span>
          <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
        </div>
        <QuestionList questions={questions} />
      </div>
    </div>
  )
}

export default MyBookmarkQuestion
