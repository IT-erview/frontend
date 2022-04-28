// react
import { useEffect, useState } from 'react'
// util
import { Question } from 'utils/type'
// api
import { getBookmarks } from 'api/bookmark'
// component
import 'views/mypage/css/MyBookmarkQuestion.css'
import QuestionList from 'views/common/question/QuestionList'
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'

const MyBookmarkQuestion = () => {
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)
  const [questions, setQuestions] = useState<Array<Question>>([])

  useEffect(() => {
    const initQuestions = async () => {
      let params = {
        sort: `${sort}`,
        page: 0,
        size: 30,
      }
      setQuestions(await getBookmarks(params))
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
