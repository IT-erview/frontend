import 'css/Navigation.css'
import QuestionComponent from 'components/Question'
import { Question } from 'common/type'

const QuestionList = (props: { questions: Array<Question> }) => {
  return (
    <div>
      {(props.questions.length > 0 &&
        props.questions.map((question, index) => (
          <div key={question.id}>
            <div>
              <QuestionComponent
                key={question.id}
                id={question.id}
                number={index + 1}
                content={question.content}
                tagList={question.tagList}
                answer={question.mostLikedAnswer?.content}
                bookmark={question.bookmark}
                bookmarkCount={question.bookmarkCount}
              />
            </div>
          </div>
        ))) ||
        '등록된 문제가 없습니다.'}
    </div>
  )
}
export default QuestionList
