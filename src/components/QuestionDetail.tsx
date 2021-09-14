import { CSSProperties, useEffect, useState } from 'react'
import 'css/QuestionDetail.css'
import AnswerComponet from 'components/Answer'

import InfiniteAnswerList from 'components/InfiniteAnswerList'
import { Answer, Question } from 'common/type'
import { getMyAnswer, getQuestion } from 'common/api'

const enum Sort {
  LIKED = 'liked',
  LATEST = 'latest',
}
// 북마크 개수, 해당되는 태그, 작성자 없음
const QuestionDetail = (props: { questionId: number }) => {
  const [question, setQuestion] = useState<Question>()
  const [myAnswer, setMyAnswer] = useState<Answer>()
  const [selectedSort, setSelectedSort] = useState<Sort>(Sort.LIKED)

  const getOrderButtonStyles = (sort: Sort) => {
    const style: CSSProperties = {
      color: '#4d4d4e',
      borderColor: '#707070',
      fontWeight: 'bold',
    }
    if (selectedSort !== sort) {
      style.color = '#6a737d'
      style.borderColor = '#cdcdd5'
      style.fontWeight = 'normal'
    }
    return style
  }

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
  }, [props.questionId, selectedSort])

  return (
    <div>
      <div className="question-detail-content">
        <h1>문제 설명</h1>
        <span>{question?.content}</span>
      </div>
      <div className="question-detail-answer">
        <span>나의 답변</span>
        {myAnswer && (
          <AnswerComponet
            id={myAnswer.id}
            number={1}
            answer={myAnswer.content}
            title={myAnswer.userName}
            like={myAnswer.liked}
          />
        )}
      </div>
      <div className="question-detail-others">
        <h2>다른 사람의 답변</h2>
        <button
          style={getOrderButtonStyles(Sort.LATEST)}
          id="sort-by-latest"
          onClick={() => setSelectedSort(Sort.LATEST)}>
          최신순
        </button>
        <button style={getOrderButtonStyles(Sort.LIKED)} id="sort-by-like" onClick={() => setSelectedSort(Sort.LIKED)}>
          인기순
        </button>
      </div>
      <div className="queiston-detail-others-answer">
        <div id="hr-line" />
        <InfiniteAnswerList question={props.questionId} title={question?.content} sortBy={selectedSort} type="" />
      </div>
    </div>
  )
}

export default QuestionDetail
