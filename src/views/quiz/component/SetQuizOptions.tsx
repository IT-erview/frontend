// todo: refactoring
// react
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
// util
import { TagSelectorItem } from 'utils/type'
// style
import 'views/quiz/style/SetQuizOption.sass'
// redux
import { setQuizQuestions } from 'modules/quizQuestions'
import { setQuizTagSelected } from 'modules/quizTags'
// api
import { getQuizQuestions } from 'api/question'
// component
import UserInfo from 'views/common/user/UserInfo'
import TagDropdown from 'views/common/tag/TagDropdown'

const SetQuizOptions = () => {
  const dispatch = useDispatch()
  const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)

  // todo: 리팩토링 필요
  const deselectTag = (tagId: number) => {
    dispatch(setQuizTagSelected({ tagId, isSelected: false }))
  }

  const getQuizzes = async () => {
    const tagList = quizTags.filter((tag: TagSelectorItem) => tag.isSelected).map((tag: TagSelectorItem) => tag.id)
    let params = {
      tags: tagList.toString(),
    }
    if (tagList.length === 0) {
      const randomConfirm = window.confirm('선택된 태그가 없습니다. 랜덤으로 문제를 불러올까요?')
      if (randomConfirm) {
        const getQuiz = await getQuizQuestions(params)
        if (getQuiz.data) dispatch(setQuizQuestions(getQuiz.data))
      }
    } else {
      const getQuiz = await getQuizQuestions(params)
      if (getQuiz.data) dispatch(setQuizQuestions(getQuiz.data))
      else window.alert('해당 태그에 해당하는 문제가 없습니다!')
    }
  }

  const showSelectedTags = quizTags.map((tag: TagSelectorItem, index: number) => {
    if (tag.isSelected)
      return (
        <button key={index} onClick={() => deselectTag(tag.id)} className={'selected-tag'}>
          {tag.name} X
        </button>
      )
    else return null
  })

  const resetSelectedTags = () => {
    quizTags.forEach((tag: TagSelectorItem) => {
      if (tag.isSelected) deselectTag(tag.id)
    })
  }

  const setQuizOptionsImg = '/img/quiz_img.png'

  return (
    <>
      <div className={'set-quiz-wrap'}>
        <section className={'banner-wrap'} style={{ backgroundImage: `url(${setQuizOptionsImg})` }}>
          <div className={'container'}>
            <h1>면접문제 학습</h1>
            <p>
              아직도 암기식으로 면접을 준비하시나요?
              <br />
              체계적으로 전략적으로 학습해보세요!
            </p>
            <div className={'set-quiz-tip-wrap'}>
              <div className={'set-quiz-tip-box'}>
                풀고 싶은
                <br /> 문제 종류와 개수를
                <br /> 선택해주세요!
              </div>
            </div>
          </div>
        </section>
        <section className={'content-wrap'}>
          <div className="container">
            <UserInfo />
            <article className={'option-box-wrap'}>
              <div className={'option-box-title-wrap'}>
                <h2>문제 종류</h2>
              </div>
              <TagDropdown tags={quizTags} setTagSelected={setQuizTagSelected} />
            </article>
            <article className={'selected-box-wrap'}>
              <div className={'selected-box-title-wrap'}>
                <h2>문제 풀기</h2>
              </div>
              <div className={'selected-tag-box'}>
                <div className={'selected-tag-box-title-wrap'}>
                  <h3>선택된 문제 종류</h3>
                  <button className={'btn-reset'} onClick={resetSelectedTags}>
                    필터 초기화 X
                  </button>
                </div>
                <div className={'selected-tags-list-wrap'}>{showSelectedTags}</div>
                <div className={'btn-wrap'}>
                  <button className={'btn-start'} onClick={getQuizzes}>
                    시작
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  )
}

export default SetQuizOptions
