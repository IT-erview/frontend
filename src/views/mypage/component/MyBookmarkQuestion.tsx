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
import MypageFilter from 'views/mypage/component/MyPageFilter'
import { useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import { filter } from 'modules/searchFilter'

const MyBookmarkQuestion = () => {
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
        tags: tagList,
      }
      let bookmarkList = await getBookmarks(params)
      if (bookmarkList.status === 200) {
        setQuestions([])
        bookmarkList.data.content.forEach(
          (ques: { createdDate: string; email: string; id: number; modifiedDate: string; question: Question }) => {
            setQuestions((prev) => [...prev, ques.question])
          },
        )
      }
    }
    initQuestions()
  }, [filter, tagList])

  return (
    <div className="mypage-bookmark-wrap">
      <MypageFilter />
      <QuestionList questions={questions} />
      <div className="mypage-register-bookmark-title"></div>
    </div>
  )
}

export default MyBookmarkQuestion
