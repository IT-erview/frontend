import 'mypage/css/MyLikeAnswer.css'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import SortSelectBox, { Sort } from '../../common/form/SortSelectBox'
import { Answer } from 'common/type'
import { getMyAnswers, getMyLikedAnswers } from 'common/api'
import AnswerComponent from 'common/answer/Answer'

export enum MyAnswerType {
  ALL,
  LIKED,
}

const MyAnswers = (props: { type: MyAnswerType }) => {
  const ROWS_PER_PAGE = 4
  const INITIAL_PAGE = 0
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [hasMore, setHasMore] = useState(true)
  const [answers, setAnswers] = useState<Array<Answer>>([])

  const getAnswers = async (type: MyAnswerType, sort: string, page: number) => {
    if (type === MyAnswerType.ALL) return await getMyAnswers(sort, page, ROWS_PER_PAGE)
    return await getMyLikedAnswers(sort, page, ROWS_PER_PAGE)
  }

  const fetchAnswers = async () => {
    if (!hasMore) return
    const nextPage = page + 1
    const fetchedAnswer = await getAnswers(props.type, sort, nextPage)
    setPage(nextPage)
    setAnswers((answers) => [...answers, ...fetchedAnswer])
  }

  useEffect(() => {
    const refreshAnswers = async () => {
      const fetchedAnswer = await getAnswers(props.type, sort, INITIAL_PAGE)
      setHasMore(fetchedAnswer.length > 0)
      setAnswers(fetchedAnswer)
      setPage(INITIAL_PAGE)
    }
    refreshAnswers()
  }, [sort, props.type])

  return (
    <div className="mypage-register-like">
      <div className="mypage-register-like-question">
        <div className="mypage-register-question-title">
          <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
        </div>
        <InfiniteScroll
          style={{ overflow: 'inherit' }}
          dataLength={answers.length}
          next={fetchAnswers}
          hasMore={hasMore}
          loader={<></>}>
          {answers.map((answer, index) => {
            console.log(answer.questionId)
            return (
              <AnswerComponent
                key={answer.id}
                id={answer.questionId}
                number={index + 1}
                content={answer.questionContent || ''}
                answer={answer.content}
                tagList={answer.tags}
                like={answer.like}
                likeCount={answer.liked}
              />
            )
          })}
          {answers.length === 0 && '등록된 답변이 없습니다.'}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default MyAnswers
