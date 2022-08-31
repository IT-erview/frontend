// todo: refactoring
// react
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
// util
import { QuizAnswer, TagSelectorItem } from 'utils/type'
// style
import 'views/quiz/style/QuizResult.sass'
// redux
import { NextQuiz, setNextQuestion } from 'modules/nextQuestion'
// component
import Navigation from 'views/common/layout/Navigation'
import Footer from 'views/common/layout/Footer'
import Question from 'views/common/question/Question'

const QuizResultPage = () => {
  const quizzes = useSelector<ReducerType, Array<QuizAnswer>>((state) => state.quizQuestions)
  const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)
  const userImgUrl = localStorage.getItem('userImgUrl') as string
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setNextQuestion(NextQuiz.QUIT))
  }, [dispatch])

  return (
    <>
      <Navigation />
      <div className={'quiz-result-wrap'}>
        <section className={'banner-wrap'} style={{ background: 'url(/img/quiz_img.png)' }}>
          <div className={'container'}>
            <h1>면접문제 학습</h1>
            <p>
              아직도 암기식으로 면접을 준비하시나요?
              <br />
              체계적으로 전략적으로 학습해보세요!
            </p>
            <div className={'quiz-result-tip-wrap'}>
              <div className={'quiz-result-tip-box'}>
                푼 문제를 <br />
                확인해주세요
              </div>
            </div>
          </div>
        </section>
        <section className={'content-wrap'}>
          <div className={'container'}>
            <div className={'quiz-result-box-wrap'}>
              <div className={'quiz-box-common quiz-box-user'}>
                <div className={'quiz-user'}>
                  <div className={'image-wrap'}>
                    <img src={userImgUrl} alt="profile" className={'user-profile'} />
                  </div>
                  <div className={'user-info-text'}>
                    <p className={'user-name'}>{localStorage.getItem('userName')}</p>
                    <p className={'user-email'}>{localStorage.getItem('userEmail')}</p>
                  </div>
                </div>
                <div className={'quiz-count'}>
                  <ul>
                    <li className={'today'}>
                      <span className={'count-label'}>오늘 푼 문제</span>
                      <span className={'count-number'}>13</span>
                    </li>
                    <li className={'total'}>
                      <span className={'count-label'}>누적 푼 문제</span>
                      <span className={'count-number'}>183</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={'quiz-box-common quiz-box-tags'}>
                <h3>선택된 문제 태그</h3>
                <div className={'tag-list-wrap'}>
                  {quizTags.map((tag: TagSelectorItem) => {
                    return (
                      tag.isSelected && (
                        <button key={tag.id} className={'tag'}>
                          {tag.name}
                        </button>
                      )
                    )
                  })}
                </div>
              </div>
            </div>
            <div className={'solved-quiz-wrap'}>
              <div className={'solved-quiz-title-wrap'}>
                <h2>풀었던 문제</h2>
              </div>
              <div className={'solved-quiz-list-wrap'}>
                {quizzes.map((quiz: QuizAnswer, idx) => {
                  return quiz.answer.length > 0 ? (
                    <Question
                      key={quiz.question.id}
                      id={quiz.question.id}
                      number={idx + 1}
                      content={quiz.question.content}
                      tagList={quiz.question.tagList}
                      answer={quiz.answer}
                      bookmark={quiz.question.bookmark}
                      bookmarkCount={quiz.question.bookmarkCount}
                    />
                  ) : null
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default QuizResultPage
