import { useEffect, useState } from 'react'
import 'css/QuestionDetail.css'
import AnswerComponet from 'components/Answer'

import InfiniteAnswerList from 'components/InfiniteAnswerList'
import { Answer, Question } from 'common/type'
import { getAnswers, getMyAnswer, getQuestion } from 'common/api'
import SortSelectBox, { Sort } from './SortSelectBox'

// 북마크 개수, 해당되는 태그, 작성자 없음
const QuestionDetail = (props: { questionId: number }) => {
  const ROWS_PER_PAGE = 4
  const [question, setQuestion] = useState<Question>()
  const [myAnswer, setMyAnswer] = useState<Answer | null>()
  const [answers, setAnswers] = useState<Array<Answer>>([])
  const [page, setPage] = useState(0)
  const [sort, setSort] = useState<Sort>(Sort.LIKED)

  useEffect(() => {
    const initMyAnswer = async () => {
      const answer = await getMyAnswer(props.questionId)
      setMyAnswer(answer)
    }
    const initQuestion = async () => {
      const question = await getQuestion(props.questionId)
      setQuestion(question)
    }
    initMyAnswer()
    initQuestion()
  }, [props.questionId, sort])

  useEffect(() => {
    const initAnswers = async () => {
      const fetchedAnswer = await getAnswers(props.questionId, sort, page, ROWS_PER_PAGE)
      setAnswers(fetchedAnswer)
    }
    initAnswers()
  }, [sort, page])

  return (
    <div>
      <div className="question-detail-content">
        <h1>문제 설명</h1>
        <span>{question?.content}</span>
      </div>
      <div className="question-detail-answer">
        <span>나의 답변</span>
        {myAnswer && question && (
          <AnswerComponet
            id={myAnswer.id}
            number={1}
            answer={myAnswer.content}
            title={question.content}
            like={myAnswer.liked}
          />
        )}
      </div>
      <div className="question-detail-others">
        <h2>다른 사람의 답변</h2>
        <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
      </div>
      <div className="question-detail-others-answer">
        <div id="hr-line" />
        <InfiniteAnswerList answers={answers} onScrollEnd={() => {}} />
      </div>
    </div>
  )
}

export default QuestionDetail
