// memo 제외하고 대부분 완료
// import 'css/MainPage.css'
// react
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
// util
import { MAX_SEARCH_TAG_LENGTH } from 'utils/config'
import { Answer as AnswerType, Question as QuestionType, TagSelectorItem } from 'utils/type'
// style
import 'views/main/css/MainPage.sass'
// redux
import { setSearchTagSelected } from 'modules/searchTags'
// api
import { getHitsAnswers } from 'api/answer'
import { getHitsQuestions } from 'api/question'
// component
import Navigation from 'views/common/layout/Navigation'
import Footer from 'views/common/layout/Footer'
import LoginModal from 'views/common/login/LoginModal'
import Question from 'views/common/question/Question'
import Answer from 'views/common/answer/Answer'

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
  const [hitsAnswers, setHitAnswers] = useState<Array<AnswerType>>([])
  const history = useHistory()
  const [questionSort, setQuestionSort] = useState<string>('weekly')
  const [answerSort, setAnswerSort] = useState<string>('weekly')
  const [moreQuestion, setMoreQuestion] = useState<boolean>(false)
  const [moreAnswer, setMoreAnswer] = useState<boolean>(false)
  const [selectedTags, setSelectedTags] = useState<Array<TagSelectorItem>>(
    searchTags.filter((tag) => tag.isSelected === true),
  )

  const onTagSelect = (tagId: number, isSelected: boolean) => dispatch(setSearchTagSelected({ tagId, isSelected }))

  const selectTag = (tag: TagSelectorItem) => {
    onTagSelect(tag.id, !tag.isSelected)
    setTagSearchText('')
    if (tag.isSelected) {
      setSelectedTags(selectedTags.filter((item) => item.id !== tag.id))
    } else {
      setSelectedTags([...selectedTags, { id: tag.id, name: tag.name, isSelected: !tag.isSelected }])
    }
  }

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

  const resetSelectedTags = () => {
    selectedTags.forEach((tag) => {
      onTagSelect(tag.id, !tag.isSelected)
    })
    setSelectedTags([])
  }

  useEffect(() => {
    setSearchingTags(findTags(searchTags, tagSearchText))
  }, [searchTags, tagSearchText])

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

  const showTags = searchingTags.map((tag, index) => {
    return (
      <li key={index}>
        <button onClick={() => selectTag(tag)} className={`${tag.isSelected ? 'selected' : ''} tag`}>
          {tag.name}
        </button>
      </li>
    )
  })

  const showSelectedTags = selectedTags.map((tag, index) => {
    return (
      <li key={index}>
        <button className={'selected-tag'} onClick={() => selectTag(tag)}>
          {tag.name} X
        </button>
      </li>
    )
  })

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
              <div className={'search-box'}>
                <div className={'search-input-wrap'}>
                  <input
                    type="text"
                    maxLength={MAX_SEARCH_TAG_LENGTH}
                    value={tagSearchText}
                    onChange={(e) => {
                      setTagSearchText(e.target.value)
                    }}
                    placeholder="검색어를 입력해주세요."
                    className={'search-input'}
                  />
                  <button
                    onClick={() => {
                      history.push('/QuestionSearch')
                    }}
                    className={'search-button'}>
                    검색하기
                  </button>
                </div>
                <p className={'search-information'}>
                  일일이 찾아야 했던 면접 질문과 답변들, 검증되지 않았던 정보들, 한 번에 검색하고 검증된 정보를
                  받아보세요.
                </p>
              </div>

              {selectedTags.length > 0 && (
                <div className={'selected-tag-wrap'}>
                  <ul>{showSelectedTags}</ul>
                  <button onClick={resetSelectedTags} className={'btn-reset'}>
                    검색어 초기화 X
                  </button>
                </div>
              )}
              <div className={'tag-wrap'}>
                <ul>{showTags}</ul>
              </div>
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
