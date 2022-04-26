import { useEffect, useState } from 'react'
import 'views/quiz/css/QuestionDetail.css'
import AnswerComponent from 'views/common/answer/Answer'

import { Answer, Question } from 'utils/type'
import { getAnswers, getMyAnswer } from 'api/answer'
import { getQuestion } from 'api/question'
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'
import InfiniteScroll from 'react-infinite-scroll-component'

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
    const fetchedAnswer = await getAnswers(props.questionId, sort, nextPage, ROWS_PER_PAGE)
    setPage(nextPage)
    setAnswers((answers) => [...answers, ...fetchedAnswer])
  }

  useEffect(() => {
    const initMyAnswer = async () => {
      const answer = await getMyAnswer(props.questionId)
      setMyAnswer(answer)
    }
    const initQuestion = async () => {
      const question = await getQuestion(props.questionId)
      if (question) setQuestion(question)
    }
    const refreshAnswers = async () => {
      const fetchedAnswer = await getAnswers(props.questionId, sort, INITIAL_PAGE, ROWS_PER_PAGE)
      setHasMore(fetchedAnswer.length > 0)
      setAnswers(fetchedAnswer)
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
