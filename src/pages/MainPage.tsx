// memo 제외하고 대부분 완료
// import 'css/MainPage.css'
import { JWT_TOKEN } from 'constants/Oauth'
import axios from 'axios'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import styles from 'css/MainPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import LoginModal from 'components/LoginModal'
import { MAX_SEARCH_TAG_LENGTH } from 'common/config'
import { useCallback, useEffect, useState } from 'react'
import { Answer, Question as QuestionType, TagSelectorItem } from 'common/type'
import { setSearchTagSelected } from 'modules/searchTags'
import { useHistory } from 'react-router'
import Question from 'components/Question'
import { getHitsAnswers, getHitsQuestions } from 'common/api'

// header 설정
axios.defaults.headers.common['Authorization'] = `Bearer ${JWT_TOKEN}`
// enum FeatureDescriptionType {
//   SEARCH,
//   REGISTER,
//   MY_PAGE,
//   QUIZ,
// }
// memo: 쓰임새 보고 global로 변경
// const isAuthorized = () => {
//   return getCookie('Authorization')
// }

// const featureDescriptions = [
//   {
//     title: '문제 검색',
//     description: '문제 검색 기능을 통해 태그와 키워드로 원하는 문제를 검색해보세요!',
//     type: FeatureDescriptionType.SEARCH,
//   },
//   {
//     title: '문제 등록',
//     description: '문제 등록 기능을 통해 궁금했던 문제를 등록하여 다른사람의 답변을 받아보세요!',
//     type: FeatureDescriptionType.REGISTER,
//   },
//   {
//     title: '마이페이지',
//     description: "마이페이지 기능을 통해 나의 IT'erview 기록들을 확인해보세요!",
//     type: FeatureDescriptionType.MY_PAGE,
//   },
//   {
//     title: '퀴즈',
//     description: '퀴즈 기능을 통해 모의 면접을 경험해보세요!',
//     type: FeatureDescriptionType.QUIZ,
//   },
// ]

const MainPage = () => {
  const dispatch = useDispatch()
  const loginModal = useSelector<ReducerType, boolean>((state) => state.loginModal)
  const searchTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.searchTags)
  const [tagSearchText, setTagSearchText] = useState<string>('')
  const [searchingTags, setSearchingTags] = useState<Array<TagSelectorItem>>([])
  const [hitsQuestions, setHitQuestions] = useState<Array<QuestionType>>([])
  const [hitsAnswers, setHitAnswers] = useState<Array<Answer>>([])
  const history = useHistory()
  const [questionSort, setQuestionSort] = useState<string>('weekly')
  const [answerSort, setAnswerSort] = useState<string>('weekly')
  const [moreQuestion, setMoreQuestion] = useState<boolean>(false)
  const [moreAnswer, setMoreAnswer] = useState<boolean>(false)

  const onTagSelect = (tagId: number, isSelected: boolean) => dispatch(setSearchTagSelected({ tagId, isSelected }))

  const findTags = (tags: Array<TagSelectorItem>, text: string) => {
    const result = [] as Array<TagSelectorItem>
    tags.forEach((tag) => {
      const tagNameLower = tag.name.toLowerCase()
      const textLower = text.toLowerCase()
      if (tagNameLower.indexOf(textLower) !== -1) result.push(tag)
    })
    if (result.length === 0) return tags
    else return result
  }

  const showTags = searchingTags.map((tag, index) => {
    return (
      <button
        key={index}
        onClick={() => onTagSelect(tag.id, !tag.isSelected)}
        className={tag.isSelected ? styles.questionSearchTagSelected : styles.questionSearchTagDeselected}>
        {tag.name}
      </button>
    )
  })

  const showHitsQuestions = () => {
    return (
      <div className={styles.hitsQuestions}>
        <span className={styles.hitsTitle}>베스트 면접 문제</span>
        <div className={styles.sort}>
          <button
            className={questionSort === 'weekly' ? styles.sortSelected : styles.sortDeselected}
            onClick={() => setQuestionSort('weekly')}>
            주간
          </button>
          |
          <button
            className={questionSort === 'monthly' ? styles.sortSelected : styles.sortDeselected}
            onClick={() => setQuestionSort('monthly')}>
            월간
          </button>
        </div>
        <div className={styles.hitsLine}></div>
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
                answer={question.mostLikedAnswer}
              />
            )
          })}
        <div className={styles.more}>
          <button onClick={() => setMoreQuestion((prev) => !prev)} className={styles.moreBtn}>
            더보기 +
          </button>
        </div>
      </div>
    )
  }

  const showHitsAnswers = () => {
    return (
      <div className={styles.hitsAnswers}>
        <h1 className={styles.hitsTitle}>베스트 면접 답변</h1>
        <div className={styles.sort}>
          <button
            className={answerSort === 'weekly' ? styles.sortSelected : styles.sortDeselected}
            onClick={() => setAnswerSort('weekly')}>
            주간
          </button>
          |
          <button
            className={answerSort === 'monthly' ? styles.sortSelected : styles.sortDeselected}
            onClick={() => setAnswerSort('monthly')}>
            월간
          </button>
        </div>

        <div className={styles.hitsLine}></div>
        {hitsAnswers.length > 0 &&
          hitsAnswers.map((answer, idx) => {
            if (!moreAnswer && idx >= 3) return null
            return (
              <Question
                key={answer.id}
                id={answer.questionId}
                number={idx + 1}
                content={answer.questionContent!}
                tagList={answer.tags}
                answer={answer}
              />
            )
          })}
        <div className={styles.more}>
          <button onClick={() => setMoreAnswer((prev) => !prev)} className={styles.moreBtn}>
            더보기 +
          </button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    setSearchingTags(findTags(searchTags, tagSearchText))
  }, [searchTags, tagSearchText])

  const getQuestions = useCallback(async () => {
    const questions = await getHitsQuestions(questionSort)
    setHitQuestions(questions)
  }, [questionSort])

  const getAnswers = useCallback(async () => {
    const answers = await getHitsAnswers(answerSort)
    setHitAnswers(answers)
  }, [answerSort])

  useEffect(() => {
    getQuestions()
  }, [getQuestions])
  useEffect(() => {
    getAnswers()
  }, [getAnswers])

  return (
    <>
      <div className={loginModal ? styles.blur : styles.main}>
        <Navigation />
        <div className={styles.banner}>
          <div className={styles.backgroundBox}>
            <img className={styles.backgroundCover} src="img/background_0.png" alt="background" />
          </div>
          <div className={styles.logo}>
            <img src="img/iterview_logo_white.png" alt="logo" />
          </div>
          <p className={styles.introduction}>
            IT’erview는 개발자들의 면접을 효율적으로 도와주는 서비스입니다. 체계적인 면접 학습을 경험해보세요.
          </p>
          <div>
            <div className={styles.contentIntroductionUp}>
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1L11.1538 10.3077V10.3077C11.6212 10.775 12.3788 10.775 12.8462 10.3077V10.3077L23 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className={styles.contentIntroductionTitle}>
              <p className={styles.contentIntroductionTitleText}>퀴즈</p>
            </div>
            <div className={styles.contentIntroductionContent}>
              마이페이지, 문제검색, 퀴즈에 대한 자세한 설명 및 사용법을 설명해주는 박스입니다.
              <br />
              사용자가 로그인하면 해당 박스는 사용자의 개인 정보를 보여주는 박스로 변경될 예정입니다.
            </div>
            <div className={styles.contentIntroductionDown}>
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
          <div className={styles.questionSearchBox}>
            <div className={styles.questionSearchTitle}>문제 검색</div>
            <input
              type="text"
              maxLength={MAX_SEARCH_TAG_LENGTH}
              value={tagSearchText}
              onChange={(e) => {
                setTagSearchText(e.target.value)
              }}
              placeholder="검색어를 입력해주세요."
              className={styles.questionSearchText}
            />
            <button
              onClick={() => {
                history.push('/QuestionSearch')
              }}
              className={styles.questionSearchBtn}>
              검색하기
            </button>
            <button onClick={() => setTagSearchText('')} className={styles.questionSearchResetBtn}>
              검색어 초기화 X
            </button>
            <div className={styles.questionSearchLine} />
            <p className={styles.questionSearchExplain}>
              일일이 찾아야 했던 면접 질문과 답변들, 검증되지 않았던 정보들, 한 번에 검색하고 검증된 정보를 받아보세요.
            </p>
            <div className={styles.questionSearchTag}>{showTags}</div>
          </div>
        </div>
        <div className="body">
          <div className="hit-section">
            {showHitsQuestions()}
            {showHitsAnswers()}
          </div>
        </div>
      </div>
      <Footer />
      <LoginModal />
    </>
  )
}

export default MainPage
