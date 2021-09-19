import { useEffect, useState } from 'react'
import 'css/Navigation.css'
import QuestionComponent from 'components/Question'
import { getBookmarks, getMyQuestions, searchQuestions } from 'common/api'
import { Question } from 'common/type'

const QuestionList = (props: {
  sort: string
  type: 'bookmark' | 'question' | 'search'
  tagList?: Array<string>
  keyword?: string
}) => {
  const [questions, setQuestions] = useState<Array<Question>>([])

  useEffect(() => {
    const loadQuestions = async () => {
      if (props.type === 'bookmark') return setQuestions(await getBookmarks(props.sort, false))
      if (props.type === 'question') return setQuestions(await getMyQuestions(props.sort))
      return setQuestions(await searchQuestions(props.keyword || '', props.sort, props.tagList))
    }
    loadQuestions()
  }, [props])

  return (
    <div>
      {(questions.length > 0 &&
        questions.map((question, index) => (
          <div key={question.id}>
            <div>
              <QuestionComponent
                key={question.id}
                id={question.id}
                number={index + 1}
                content={question.content}
                tagList={question.tagList}
                answer={question.mostLikedAnswer}
              />
            </div>
          </div>
        ))) ||
        '등록된 문제가 없습니다.'}
    </div>
  )
}
export default QuestionList
