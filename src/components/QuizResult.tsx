// todo: refactoring
import 'css/QuizResult.css'
import { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Question from 'components/Question'
import { Question as QuestionType, TagSelectorItem } from 'common/type'
import { useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'

const QuizResult: React.FunctionComponent<{ quizzes: Array<QuestionType> } & RouteComponentProps> = ({
  quizzes,
}: {
  quizzes: Array<QuestionType>
}) => {
  const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)
  const changeTitle = () => {
    const midTitle = document.getElementById('quiz-option-title')!
    const subTitle = document.getElementById('quiz-option-sub-title')!
    midTitle.innerHTML = '면접문제 결과'
    subTitle.innerHTML = '본인이 풀었던 문제를 확인해보세요!'
  }

  useEffect(() => {
    changeTitle()
  }, [])

  return (
    <div className="quiz-result-page">
      <div id="quiz-result-info-detail">
        푼 문제를 <br />
        확인해주세요
      </div>
      <div className="set-quiz-result-box">
        <div className="user-quiz-result">
          <div className="user-quiz-result-content">
            <h4>{localStorage.getItem('userName')}</h4>
            <hr className="hr" />
            <h6>문제당 평균 시간</h6>
            <span>02:50</span>
            <h6>좋아요</h6>
            <span>50</span>
            <h6>퀴즈로 푼 문제</h6>
            <span>170</span>
          </div>
        </div>
        <div className="selected-quiz-tag">
          <div className="selected-quiz-tag-content">
            <h4>퀴즈 태그</h4>
            <hr className="hr2" />
            {quizTags.map((tag: TagSelectorItem) => {
              return (
                tag.isSelected && (
                  <button key={tag.id} className="tag-btn">
                    {tag.name}
                  </button>
                )
              )
            })}
          </div>
        </div>
        <div className="quiz-time-info">
          <div className="quiz-time-content">
            <h4>소요시간</h4>
            <hr className="hr3" />
            <h6>총 소요시간</h6>
            <span>00:00:00</span>
            <h6>문제당 소요시간</h6>
            <span>00:00:00</span>
          </div>
        </div>
      </div>
      <div className="solved-quiz">
        <div className="solved-quiz-title">
          <span>풀었던 문제</span>
          <div className="hr4" />
        </div>
        <div className="each-questions">
          {quizzes.map((item: QuestionType, index: number) => {
            return (
              <Question key={index} id={item.id} number={index + 1} content={item.content} tagList={item.tagList} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default withRouter(QuizResult)
