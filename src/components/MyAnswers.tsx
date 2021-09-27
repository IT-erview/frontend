import 'css/MyLikeAnswer.css'
import MyPageProfile from 'components/MyPageProfile'
import { useEffect, useState } from 'react'
import QuestionComponent from 'components/Question'
import InfiniteScroll from 'react-infinite-scroll-component'
import SortSelectBox, { Sort } from './SortSelectBox'
import { Answer } from 'common/type'
import { getMyAnswers, getMyLikedAnswers } from 'common/api'

export enum MyAnswerType {
  ALL,
  LIKED,
}

const MyAnswers = (props: { type: MyAnswerType }) => {
  const ROWS_PER_PAGE = 4
  const INITIAL_PAGE = 0
  const [sort, setSort] = useState<Sort>(Sort.LIKED)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [hasMore, setHasMore] = useState(true)
  const [answers, setAnswers] = useState<Array<Answer>>([])

  const getAnswerTitle = (type: MyAnswerType) => {
    if (type === MyAnswerType.ALL) {
      return {
        icon: '/img/mypage_icon2.png',
        title: '내가 등록한 답변',
      }
    }
    return {
      icon: '/img/mypage_icon3.png',
      title: '내가 좋아요한 답변',
    }
  }

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
      <MyPageProfile />
      <div className="mypage-register-like-question">
        <div className="mypage-register-question-title">
          <span>
            <img src={getAnswerTitle(props.type).icon} alt="title-icon" />
            {getAnswerTitle(props.type).title}
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

export default MyAnswers
