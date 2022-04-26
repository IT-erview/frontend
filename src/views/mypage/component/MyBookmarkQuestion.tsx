import 'views/mypage/css/MyBookmarkQuestion.css'
import { useEffect, useState } from 'react'
import QuestionList from 'views/common/question/QuestionList'
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'
import { getBookmarks } from 'api/bookmark'
import { Question } from 'utils/type'

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
      <div className="mypage-register-bookmark-question">
        <div className="mypage-register-bookmark-title">
          <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
        </div>
        <QuestionList questions={questions} />
      </div>
    </div>
  )
}

export default MyBookmarkQuestion
