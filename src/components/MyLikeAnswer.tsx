import 'css/MyLikeAnswer.css'
import MyPageProfile from 'components/MyPageProfile'
import { useEffect, useState } from 'react'
import QuestionComponent from 'components/Question'
import InfiniteScroll from 'react-infinite-scroll-component'
import SortSelectBox, { Sort } from './SortSelectBox'
import { Answer } from 'common/type'
import { getMyLikedAnswers } from 'common/api'

const MyLikeAnswer = () => {
  const ROWS_PER_PAGE = 4
  const INITIAL_PAGE = 0
  const [sort, setSort] = useState<Sort>(Sort.LIKED)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [hasMore, setHasMore] = useState(true)
  const [answers, setAnswers] = useState<Array<Answer>>([])

  const fetchAnswers = async () => {
    if (!hasMore) return
    const nextPage = page + 1
    const fetchedAnswer = await getMyLikedAnswers(sort, nextPage, ROWS_PER_PAGE)
    setPage(nextPage)
    setAnswers((answers) => [...answers, ...fetchedAnswer])
  }

  useEffect(() => {
    const refreshAnswers = async () => {
      const fetchedAnswer = await getMyLikedAnswers(sort, INITIAL_PAGE, ROWS_PER_PAGE)
      setHasMore(fetchedAnswer.length > 0)
      setAnswers(fetchedAnswer)
      setPage(INITIAL_PAGE)
    }
    refreshAnswers()
  }, [sort])

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
        <InfiniteScroll
          style={{ overflow: 'inherit' }}
          dataLength={answers.length}
          next={fetchAnswers}
          hasMore={hasMore}
          loader={<></>}>
          {answers.map((answer, index) => {
            return (
              <QuestionComponent
                key={answer.id}
                id={answer.questionId}
                number={index + 1}
                content={answer.questionContent || ''}
                answer={answer}
                tagList={answer.tags}
              />
            )
          })}
          {answers.length === 0 && '등록된 답변이 없습니다.'}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default MyLikeAnswer
