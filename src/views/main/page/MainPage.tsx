// memo 제외하고 대부분 완료
// react
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
// util
import { Answer as AnswerType, Question as QuestionType } from 'utils/type'
// style
import 'views/main/style/MainPage.sass'
// api
import { getHitsAnswers } from 'api/answer'
import { getHitsQuestions } from 'api/question'
// component
import Navigation from 'views/common/layout/Navigation'
import Footer from 'views/common/layout/Footer'
import LoginModal from 'views/common/login/LoginModal'
import Question from 'views/common/question/Question'
import Answer from 'views/common/answer/Answer'
import TagSearch from 'views/common/tag/TagSearch'

const MainPage = () => {
  const loginModal = useSelector<ReducerType, boolean>((state) => state.loginModal)
  const [hitsQuestions, setHitQuestions] = useState<Array<QuestionType>>([])
  const [hitsAnswers, setHitAnswers] = useState<Array<AnswerType>>([])
  const [questionSort, setQuestionSort] = useState<string>('weekly')
  const [answerSort, setAnswerSort] = useState<string>('weekly')
  const [moreQuestion, setMoreQuestion] = useState<boolean>(false)
  const [moreAnswer, setMoreAnswer] = useState<boolean>(false)

  const getQuestions = useCallback(async () => {
    let params = {
      option: questionSort,
    }
    const questions = await getHitsQuestions(params)
    if (questions.data) setHitQuestions(questions.data)
  }, [questionSort])

  const getAnswers = useCallback(async () => {
    let params = {
      option: answerSort,
    }
    const answers = await getHitsAnswers(params)
    if (answers.data) setHitAnswers(answers.data)
  }, [answerSort])

  useEffect(() => {
    getQuestions()
  }, [getQuestions])
  useEffect(() => {
    getAnswers()
  }, [getAnswers])

  const moreHideBtn = (hitsLength: number, more: boolean) => {
    if (hitsLength > 3) {
      return more ? (
        <>
          <span>{'숨기기'}</span> <img src="img/hide_btn.png" alt="button-hide" className={'btn-hide-img'} />
        </>
      ) : (
        <>
          <span>{'더보기'}</span> <img src="img/more_btn.png" alt="button-more" className={'btn-more-img'} />
        </>
      )
    } else return null
  }

  const showHitsQuestions = () => {
    return (
      <article className={'hits-question'}>
        <div className={'hits-title-wrap'}>
          <h2 className={'hits-title'}>베스트 면접 문제</h2>
          <div className={'hits-sort-wrap'}>
            <button
              type="button"
              className={`${questionSort === 'weekly' ? 'active' : ''} sort`}
              onClick={() => setQuestionSort('weekly')}>
              주간
            </button>
            <span className={'bar'}></span>
            <button
              type="button"
              className={`${questionSort === 'monthly' ? 'active' : ''} sort`}
              onClick={() => setQuestionSort('monthly')}>
              월간
            </button>
          </div>
        </div>
        <div className={'hits-content-wrap'}>
          {hitsQuestions.length > 0 &&
            hitsQuestions.map((question, idx) => {
              if (!moreQuestion && idx >= 3) return null
              return (
                <Question
                  key={question.id}
                  id={question.id}
                  number={idx + 1}
                  content={question.content}
                  tagList={question.tagList}
                  answer={question.mostLikedAnswer ? question.mostLikedAnswer.content : ''}
                  bookmarkCount={question.bookmarkCount}
                  bookmark={question.bookmark}
                />
              )
            })}
        </div>
        <div className={'hits-btn-wrap'}>
          <button onClick={() => setMoreQuestion((prev) => !prev)} className={'btn-more-hide'}>
            {moreHideBtn(hitsQuestions.length, moreQuestion)}
          </button>
        </div>
      </article>
    )
  }

  const showHitsAnswers = () => {
    return (
      <article className={'hits-answer'}>
        <div className={'hits-title-wrap'}>
          <h2 className={'hits-title'}>베스트 면접 답변</h2>
          <div className={'hits-sort-wrap'}>
            <button
              className={`${answerSort === 'weekly' ? 'active' : ''} sort`}
              onClick={() => setAnswerSort('weekly')}>
              주간
            </button>
            <span className={'bar'}></span>
            <button
              className={`${answerSort === 'monthly' ? 'active' : ''} sort`}
              onClick={() => setAnswerSort('monthly')}>
              월간
            </button>
          </div>
        </div>

        <div className={'hits-content-wrap'}>
          {hitsAnswers.length > 0 &&
            hitsAnswers.map((answer, idx) => {
              if (!moreAnswer && idx >= 3) return null
              return (
                <Answer
                  key={answer.id}
                  id={answer.questionId}
                  number={idx + 1}
                  content={answer.questionContent!}
                  tagList={answer.tags}
                  answer={answer.content}
                  likeCount={answer.liked}
                  like={answer.like}
                />
              )
            })}
        </div>
        <div className={'hits-btn-wrap'}>
          <button onClick={() => setMoreAnswer((prev) => !prev)} className={'btn-more-hide'}>
            {moreHideBtn(hitsAnswers.length, moreAnswer)}
          </button>
        </div>
      </article>
    )
  }

  return (
    <>
      <Navigation />
      <div className={`${loginModal ? 'blur' : ''} main`}>
        <section className={'banner-wrap'} style={{ backgroundImage: 'url(img/background_0.png)' }}>
          <div className={'container'}>
            <article className={'main-title-wrap'}>
              <div className={'logo-wrap'}>
                <img src="img/iterview_logo_white.png" className={'logo'} alt="logo" />
              </div>
              <p className={'introduction'}>
                IT’erview는 개발자들의 면접을 효율적으로 도와주는 서비스입니다.
                <br />
                체계적인 면접 학습을 경험해보세요.
              </p>
            </article>
            <article className={'information-wrap'}>
              <div className={'information-title-wrap'}>
                <div className={'btn-prev'}>
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 1L11.1538 10.3077V10.3077C11.6212 10.775 12.3788 10.775 12.8462 10.3077V10.3077L23 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className={'information-title'}>
                  <span>퀴즈</span>
                </div>
                <div className={'btn-next'}>
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 1L11.1538 10.3077V10.3077C11.6212 10.775 12.3788 10.775 12.8462 10.3077V10.3077L23 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className={'information-content'}>
                <p>
                  마이페이지, 문제검색, 퀴즈에 대한 자세한 설명 및 사용법을 설명해주는 박스입니다.
                  <br />
                  사용자가 로그인하면 해당 박스는 사용자의 개인 정보를 보여주는 박스로 변경될 예정입니다.
                </p>
              </div>
            </article>

            <article className={'search-wrap'}>
              <h2 className={'search-title'}>문제 검색</h2>
              <TagSearch />
            </article>
          </div>
        </section>
        <section className="content-wrap">
          <div className={'container'}>
            {showHitsQuestions()}
            {showHitsAnswers()}
          </div>
        </section>
      </div>
      <Footer />
      <LoginModal />
    </>
  )
}

export default MainPage
