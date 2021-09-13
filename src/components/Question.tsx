import axios from 'axios'
import { Answer } from 'common/type'
import 'css/Question.css'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'

const Question = (props: { id: number; number: number; content: string; tagList: Array<string>; answer?: Answer }) => {
  const showQuestionTags = props.tagList.map((item: any, index: number) => {
    if (index < 3) {
      return (
        <div className="question-tags" key={index}>
          {item['tagTitle']}
        </div>
      )
    } else {
      return <div key={index}></div>
    }
  })

  const checkQuestionNumber = (num: number) => {
    let questionNum = num.toString()
    if (questionNum.length < 2) {
      return '0' + num
    }
    return questionNum
  }

  const gotoDetails = () => {
    localStorage.setItem('detailTitle', props.content)
    window.open(`/QuestionDetail?${props.id}`)
    localStorage.setItem('detailId', props.id.toString())
  }

  const gotoAnswerRegister = () => {
    alert('문제에 대한 나의 답변이 없으면 다른 사람의 답변을 볼 수 없습니다. 답변 등록 페이지로 이동합니다.')
    localStorage.setItem('detailTitle', props.content)
    window.open(`/AnswerRegister`, '', '_blank')
    localStorage.setItem('detailId', props.id.toString())
  }

  return (
    <div className="each-question">
      <button
        onClick={() => {
          axios
            .get(`/api/v1/answer/${props.id}/mine`)
            .then((res) => {
              gotoDetails()
            })
            .catch((res) => {
              gotoAnswerRegister()
            })
        }}>
        <div className="question-number">{checkQuestionNumber(props.number)}</div>
        {/* <div className="question-bookmark">
          <h1>좋아요</h1>
          <span>{props.bookmarkCount}</span>
        </div> */}
        <div className="question-content">
          {props.content}
          <br />
          <span>{props.answer ? props.answer.content : '(등록된 답변이 없습니다)'}</span>
        </div>
        <div className="question-tag">{showQuestionTags}</div>
        {/* <div className="date-or-username">{props.username}</div> */}
      </button>
    </div>
  )
}

export default Question