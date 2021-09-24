import QuestionComponent from 'components/Question'
import { Answer } from 'common/type'

const InfiniteAnswerList = (props: { answers: Array<Answer>; onScrollEnd: () => void }) => {
  return (
    <div>
      {props.answers.map((answer, index) => {
        return (
          <QuestionComponent
            key={answer.id}
            id={answer.questionId}
            number={index + 1}
            content={answer.questionContent || ''}
            answer={answer}
            tagList={answer.tags}
          />
        )
      })}
      {props.answers.length === 0 && '등록된 답변이 없습니다.'}
    </div>
  )
}
export default InfiniteAnswerList
