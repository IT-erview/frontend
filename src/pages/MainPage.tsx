// memo 제외하고 대부분 완료
import 'css/MainPage.css'
import { JWT_TOKEN } from 'constants/Oauth'
import axios from 'axios'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import styles from 'css/MainPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import LoginModal from 'components/LoginModal'
import { MAX_SEARCH_TAG_LENGTH } from 'common/config'
import { useEffect, useState } from 'react'
import { TagSelectorItem } from 'common/type'
import { setSearchTagSelected } from 'modules/searchTags'
import { useHistory } from 'react-router'

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
  const history = useHistory()

  const onTagSelect = (tagId: number, isSelected: boolean) => dispatch(setSearchTagSelected({ tagId, isSelected }))

  const findTags = (tags: Array<TagSelectorItem>, text: string) => {
    const result = [] as Array<TagSelectorItem>
    tags.forEach((tag) => {
      if (tag.name.indexOf(text) !== -1) result.push(tag)
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

  useEffect(() => {
    setSearchingTags(findTags(searchTags, tagSearchText))
  }, [searchTags, tagSearchText])

  return (
    <>
      <div className={loginModal ? 'Main blur' : 'Main'}>
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
          {/* <div className={styles.contentIntroductionBox}> */}
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
        {/* <MainCarousel /> */}
        {/* <div className="body">
        <div className="main-mypage-box">
          <div>
            IT'erview를 <br />
            알아가 볼까요?
          </div>
          <h1>마이페이지</h1>
          <span>마이페이지에서 나의 IT'erview 기록들을 확인해보세요!</span>
          <Link to="/MyPage/MyRegisterQuestion">
            <button className="main-mypage-btn">마이 페이지</button>
          </Link>
        </div>
        <div className="intro-functions">
          {featureDescriptions.map((feature) => {
            return (
              <button
                key={feature.type}
                style={{
                  borderBottom: isFocused(feature.type) ? '0.01px solid #2f00ff' : 'none',
                }}
                onClick={() => {
                  setFocusedFeatureDescriptionType(feature.type)
                }}>
                <span>{feature.title}</span>
              </button>
            )
          })}
          <hr className="intro-hr" />
          <div className="function-explain">
            {featureDescriptions.map((feature) => {
              return isFocused(feature.type) && <span key={feature.type}>{feature.description}</span>
            })}
          </div>
          <br />
          <br />
        </div>
        <div className="main-question-section">
          <div>
            <h1 className="search-title">
              <img src="/img/figure1.png" alt="figure1_icon" />
              문제 검색
            </h1>
            <hr className="search-hr" />
            <span className="search-subtext">
              일일이 찾아야 했던 면접 질문과 답변들, 검증되지 않았던 정보들, 한번에 검색하고 검증된 정보를 받아보세요.
            </span>
            <div className="main-question-search-tag">
              <TagSelector tags={questionSearchTags} onTagSelect={onTagSelect} />
            </div>
            <button
              className="main-search-btn"
              onClick={() => {
                history.push('/QuestionSearch')
              }}>
              검색하기
            </button>
          </div>
          <div>
            <h1 className="register-title">
              <img src="/img/figure2.png" alt="figure1_icon" />
              문제 등록
            </h1>
            <hr className="register-hr" />
            <span className="register-subtext">
              면접문제를 어떻게 풀어야할지 막막하시죠? 어려운 문제를 등록해주세요. 함께 해결해드릴게요. <br />
              나의 의견과 다른 분들의 답변과 비교해보시고, 마음에 드는 답변을 모아보세요.
            </span>
            <button
              className="main-register-btn"
              onClick={() => {
                history.push('/QuestionRegister')
              }}>
              등록하기
            </button>
          </div>
        </div>
        <div className="hit-section">
          <div className="hit-question">
            <h1 className="hit-question-title">
              <img src="/img/figure3.png" alt="figur3_icon" />
              인기있는 면접 문제
            </h1>
            <button className="hit-question-btn">더보기</button>
            <hr className="hit-question-hr" />
            {questions.length > 0 &&
              questions.map((question, idx) => {
                return (
                  <QuestionComponent
                    key={question.id}
                    id={question.id}
                    // idx+1 ??
                    number={idx + 1}
                    content={question.content}
                    tagList={question.tagList}
                    answer={question.mostLikedAnswer}
                  />
                )
              })}
            {!isAuthorized() && <span id="question-login-text">로그인 후 볼 수 있습니다.</span>}
          </div>
          <div className="hit-answer">
            <h1 className="hit-answer-title">
              <img src="/img/figure4.png" alt="figur3_icon" />
              베스트 면접 답변
            </h1>
            <button className="hit-answer-btn">더보기</button>
            <hr className="hit-answer-hr" />
            {hitsAnswers.length > 0 &&
              hitsAnswers.map((answer, idx) => {
                return (
                  <QuestionComponent
                    key={answer.id}
                    id={answer.questionId}
                    number={idx + 1}
                    content={answer.questionContent!}
                    tagList={answer.tags}
                    answer={answer}
                  />
                )
              })}
            {!isAuthorized() && <span id="answer-login-text">로그인 후 볼 수 있습니다.</span>}
          </div>
        </div>
      </div> */}
        <Footer />
      </div>
      <LoginModal />
    </>
  )
}

export default MainPage
