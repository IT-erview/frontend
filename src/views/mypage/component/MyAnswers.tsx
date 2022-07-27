// react
import { useEffect, useState } from 'react'
// library
import InfiniteScroll from 'react-infinite-scroll-component'
// util
import { Answer } from 'utils/type'
// style
import 'views/mypage/style/MyAnswer.sass'
// api
import { getMyAnswers, getMyLikedAnswers } from 'test/api/answer'
// component
import AnswerComponent from 'views/common/answer/Answer'
import MypageFilter from 'views/mypage/component/MyPageFilter'
import { useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import { filter } from 'modules/searchFilter'

export enum MyAnswerType {
  ALL,
  LIKED,
}

const MyAnswers = (props: { type: MyAnswerType }) => {
  const ROWS_PER_PAGE = 4
  const INITIAL_PAGE = 0
  const [page, setPage] = useState(INITIAL_PAGE)
  const [hasMore, setHasMore] = useState(true)
  const [answers, setAnswers] = useState<Array<Answer>>([])
  const filter = useSelector<ReducerType, filter>((state) => state.searchFilter)
  const tagList = filter.tags
    .filter((tag) => tag.isSelected)
    .map((tag) => tag.id)
    .toString()

  const getAnswers = async (type: MyAnswerType, sort: string, tagList: string, page: number) => {
    if (type === MyAnswerType.ALL) return await getMyAnswers(sort, page, tagList, ROWS_PER_PAGE)
    return await getMyLikedAnswers(sort, page, ROWS_PER_PAGE)
  }

  const fetchAnswers = async () => {
    if (!hasMore) return
    const nextPage = page + 1
    const fetchedAnswer = await getAnswers(props.type, filter.sort, tagList, nextPage)
    setPage(nextPage)
    setAnswers((answers) => [...answers, ...fetchedAnswer])
  }

  useEffect(() => {
    const refreshAnswers = async () => {
      const fetchedAnswer = await getAnswers(props.type, filter.sort, tagList, INITIAL_PAGE)
      setHasMore(fetchedAnswer.length > 0)
      setAnswers(fetchedAnswer)
      setPage(INITIAL_PAGE)
    }
    refreshAnswers()
  }, [filter, props.type, tagList])

  return (
    <div className="mypage-answer-wrap">
      <MypageFilter />
      <InfiniteScroll
        style={{ overflow: 'inherit' }}
        dataLength={answers.length}
        next={fetchAnswers}
        hasMore={hasMore}
        loader={<></>}>
        {answers.map((answer, index) => {
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
        <p className={'list-none'}>{answers.length === 0 && '등록된 답변이 없습니다.'}</p>
      </InfiniteScroll>
      <div className="mypage-register-question-title"></div>
    </div>
  )
}

export default MyAnswers
