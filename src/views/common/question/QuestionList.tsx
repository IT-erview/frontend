import { Question } from 'utils/type'
// import 'views/common/layout/Navigation.css'
import QuestionComponent from 'views/common/question/Question'

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
        ))) || <p className={'list-none'}>등록된 문제가 없습니다.</p>}
    </div>
  )
}
export default QuestionList
