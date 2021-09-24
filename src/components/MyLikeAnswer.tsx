import 'css/MyLikeAnswer.css'
import MyPageProfile from 'components/MyPageProfile'
import { useEffect, useState } from 'react'
import InfiniteAnswerList from 'components/InfiniteAnswerList'
import SortSelectBox, { Sort } from './SortSelectBox'
import { Answer } from 'common/type'
import { getMyLikedAnswers } from 'common/api'

const MyLikeAnswer = () => {
  const ROWS_PER_PAGE = 4
  const [sort, setSort] = useState<Sort>(Sort.LIKED)
  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState<Array<Answer>>([])

  const appendAnswers = async () => {
    setPage((page) => page + 1)
    const fetchedAnswer = await getMyLikedAnswers(sort, page, ROWS_PER_PAGE)
    setAnswers((answers) => [...answers, ...fetchedAnswer])
  }

  useEffect(() => {
    const initAnswers = async () => {
      const fetchedAnswer = await getMyLikedAnswers(sort, page, ROWS_PER_PAGE)
      setAnswers(fetchedAnswer)
    }
    initAnswers()
  }, [sort, page])

  return (
    <div className="mypage-register-like">
      <MyPageProfile />
      <div className="mypage-register-like-question">
        <div className="mypage-register-question-title">
          <span>
            <img src="/img/mypage_icon3.png" />
            내가 좋아요한 답변
          </span>
          <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
        </div>
        <InfiniteAnswerList answers={answers} onScrollEnd={appendAnswers} />
      </div>
    </div>
  )
}

export default MyLikeAnswer
