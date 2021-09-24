import { Form, Input } from 'reactstrap'
import 'css/Answer.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Answer = (props) => {
  const [edit, setEdit] = useState(false)
  const [answerContents, setAnswerContents] = useState(props.answer)
  const checkQuestionNumber = (num) => {
    let questionNum = num.toString()
    if (questionNum.length < 2) {
      return '0' + num
    }
    return questionNum
  }

  const likeAnswer = () => {
    axios({
      method: 'post',
      url: '/api/v1/answer/like',
      params: {
        answerId: props.id,
      },
    })
      .then((res) => {
        // console.log(res)
        window.location.reload()
        window.alert('좋아요 되었습니다.')
      })
      .catch((err) => {
        console.log(err)
        window.alert('이미 좋아요한 답변입니다.')
      })
  }

  useEffect(() => {
    setAnswerContents(props.answer)
  }, [edit])

  const editAnswer = () => {
    axios({
      method: 'patch',
      url: '/api/v1/answer/',
      data: {
        answerId: props.id,
        content: answerContents,
      },
    })
      .then((res) => {
        window.location.reload()
        window.alert('답변이 수정되었습니다.')
        setEdit(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="each-answer">
      <div className="answer-card">
        <div className="answer-number">{checkQuestionNumber(props.number)}</div>

        {edit ? (
          <>
            <div className="answer-content">
              <h1>{props.title}</h1>
              <Form>
                {/* <span id="text-counts">( {answerContents.length} / 1000 )</span> */}
                {/* {console.log(answerContents)} */}
                {/* 최대 길이 1000이 아니라 255? */}
                <Input
                  type="textarea"
                  value={answerContents}
                  maxLength="1000"
                  onChange={(e) => {
                    setAnswerContents(e.target.value)
                  }}
                  id="answer-contents"
                />
              </Form>
            </div>
            <button className="answer-like" onClick={likeAnswer}>
              좋아요! {props.like}
            </button>
            <button className="answer-edit" onClick={editAnswer}>
              수정완료
            </button>
          </>
        ) : (
          <>
            <div className="answer-content">
              <h1>{props.title}</h1>
              <h5>{props.answer}</h5>
            </div>
            <button className="answer-like" onClick={likeAnswer}>
              좋아요! {props.like}
            </button>
            {props.mine === props.id ? (
              <button className="answer-edit" onClick={() => setEdit(true)}>
                수정하기
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}

export default Answer
