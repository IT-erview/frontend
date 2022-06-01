// react
import { useEffect, useState } from 'react'
// util
import { Question } from 'utils/type'
// style
import 'views/mypage/style/MyBookmarkQuestion.sass'
// api
import { getBookmarks } from 'api/bookmark'
// component
import QuestionList from 'views/common/question/QuestionList'
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'
import MypageFilter from 'views/mypage/component/MyPageFilter'

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
      let bookmarkList = await getBookmarks(params)
      setQuestions(bookmarkList.data)
    }
    initQuestions()
  }, [sort])

  return (
    <div className="mypage-bookmark-wrap">
      <MypageFilter />
      <QuestionList questions={questions} />
      <div className="mypage-register-bookmark-title">
        <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
      </div>
    </div>
  )
}

export default MyBookmarkQuestion
