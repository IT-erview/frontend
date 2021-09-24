import axios from 'axios'
import InfiniteAnswer from 'components/InfiniteAnswer'
import { useEffect, useState } from 'react'
import QuestionComponent from 'components/Question'
import { Answer, Question } from 'common/type'
import { getAnswers, getMyAnswer, getMyAnswers, getMyLikedAnswers, getMyQuestions } from 'common/api'

const InfiniteAnswerList = (props: {
  sort: string
  type: 'answer' | 'myAnswer' | 'myLikedAnswer'
  question?: Question
}) => {
  const ROWS_PER_PAGE = 4
  const [answers, setAnswers] = useState<Array<Answer>>([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    const initAnswers = async () => {
      const fetchedAnswer =
        props.type === 'myLikedAnswer'
          ? await getMyLikedAnswers(props.sort, page, ROWS_PER_PAGE)
          : props.type === 'myAnswer'
          ? await getMyAnswers(props.sort, page, ROWS_PER_PAGE)
          : // todo: question이 없는 문제가 여기까지 영향 발생
            await getAnswers(props.question!.id, props.sort, page, ROWS_PER_PAGE)
      // setAnswers((answers) => [...answers, ...fetchedAnswer])
      setAnswers(fetchedAnswer)
    }
    initAnswers()
  }, [props.question, props.sort, props.type, page])
  // setPage((page) => page + 1)

  const [fetching, setFetching] = useState(false)

  // if (listInfo.length === 0) {
  //   setNotExist('등록된 답변이 없습니다.')
  // } else {
  //   setNotExist('')
  // }

  // const fetchMoreData = () => {
  //   setFetching(true)
  //   let tmpSkip = skip + limit
  //   let body = {
  //     skip: tmpSkip,
  //     limit: limit,
  //     loadMore: true,
  //   }

  //   getData(body)
  //   setSkip(tmpSkip)
  //   setFetching(false)
  // }

  return (
    <div>
      {props.type === 'myAnswer' || props.type === 'myLikedAnswer' ? (
        answers.map((answer, index) => {
          // todo: question이 빈 케이스? 왜 있는지 모르겠으나, 실제로 쓰면 분리 필요해보임
          return props.question ? (
            <QuestionComponent
              key={answer.id}
              id={props.question ? props.question.id : -1}
              number={index + 1}
              content={answer.questionContent ? answer.questionContent : ''}
              answer={answer}
              tagList={props.question ? props.question.tagList : undefined}
            />
          ) : (
            <QuestionComponent
              key={answer.id}
              id={-1}
              number={index + 1}
              content={answer.questionContent ? answer.questionContent : ''}
              answer={answer}
            />
          )
        })
      ) : (
        <></>
      )}
      {answers.length === 0 && '등록된 답변이 없습니다.'}
    </div>
  )
}
export default InfiniteAnswerList
