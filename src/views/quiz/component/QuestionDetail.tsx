// react
import { useEffect, useState } from 'react'
// library
import InfiniteScroll from 'react-infinite-scroll-component'
// util
import { Answer, Question } from 'utils/type'
// style
import 'views/quiz/css/QuestionDetail.css'
// api
import { getAnswers, getMyAnswer } from 'api/answer'
import { getQuestion } from 'api/question'
// component
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'
import AnswerComponent from 'views/common/answer/Answer'

// 북마크 개수, 해당되는 태그, 작성자 없음
const QuestionDetail = (props: { questionId: number }) => {
  const ROWS_PER_PAGE = 4
  const INITIAL_PAGE = 0
  const [question, setQuestion] = useState<Question>()
  const [myAnswer, setMyAnswer] = useState<Answer | null>()
  const [answers, setAnswers] = useState<Array<Answer>>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)

  const fetchAnswers = async () => {
    if (!hasMore) return
    const nextPage = page + 1
    let params = {
      page: nextPage,
      size: ROWS_PER_PAGE,
      sort: `${sort},desc`,
    }
    const fetchedAnswer = await getAnswers(props.questionId, params)
    setPage(nextPage)
    setAnswers((answers) => [...answers, ...fetchedAnswer.data])
  }

  useEffect(() => {
    const initMyAnswer = async () => {
      const answer = await getMyAnswer(props.questionId)
      setMyAnswer(answer.data)
    }
    const initQuestion = async () => {
      const question = await getQuestion(props.questionId)
      if (question.data) setQuestion(question.data)
    }
    const refreshAnswers = async () => {
      let params = {
        page: INITIAL_PAGE,
        size: ROWS_PER_PAGE,
        sort: `${sort},desc`,
      }
      const fetchedAnswer = await getAnswers(props.questionId, params)
      setHasMore(fetchedAnswer.data.length > 0)
      setAnswers(fetchedAnswer.data)
      setPage(INITIAL_PAGE)
    }
    initMyAnswer()
    initQuestion()
    refreshAnswers()
  }, [props.questionId, sort])

  return (
    <div>
      <div className="question-detail-content">
        <h1>문제 설명</h1>
        <span>{question?.content}</span>
      </div>
      <div className="question-detail-answer">
        <span>나의 답변</span>
        {myAnswer && question && (
          <AnswerComponent
            id={myAnswer.id}
            number={1}
            answer={myAnswer.content}
            content={question.content}
            likeCount={myAnswer.liked}
            like={myAnswer.like}
          />
        )}
      </div>
      <div className="question-detail-others">
        <h2>다른 사람의 답변</h2>
        <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
      </div>
      <div className="question-detail-others-answer">
        <div id="hr-line" />
        <InfiniteScroll
          style={{ overflow: 'inherit' }}
          dataLength={answers.length}
          next={fetchAnswers}
          hasMore={hasMore}
          loader={<></>}>
          {question &&
            answers.map((answer, index) => {
              return (
                <AnswerComponent
                  key={answer.id}
                  id={answer.questionId}
                  number={index + 1}
                  content={question?.content || answer.questionContent || ''}
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

export default QuestionDetail
