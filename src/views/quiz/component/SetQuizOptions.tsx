// todo: refactoring
// react
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
// util
import { TagSelectorItem } from 'utils/type'
// style
import styles from 'views/quiz/css/Quiz.module.css'
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
      tags: tagList,
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
        <button key={index} onClick={() => deselectTag(tag.id)} className={styles.selectedTag}>
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
    <div>
      <div>
        <div className={styles.banner}>
          <img src={setQuizOptionsImg} alt="question_banner_img" className={styles.bannerImg} />

          <p className={styles.bannerTitle}>면접문제 학습</p>
          <p className={styles.bannerContent}>
            아직도 암기식으로 면접을 준비하시나요?
            <br />
            체계적으로 전략적으로 학습해보세요!
          </p>
          <div className={styles.bannerInfo}>
            <p className={styles.bannerInfoText}>
              풀고 싶은
              <br /> 문제 종류와 개수를
              <br /> 선택해주세요!
            </p>
          </div>
        </div>
        <div className={styles.body}>
          <UserInfo />
          <div className={styles.selectTagsBox}>
            <p className={styles.selectTagsTitle}>문제 종류</p>
            <div className={styles.horizontalLine} />
            <TagDropdown tags={quizTags} setTagSelected={setQuizTagSelected} />
            <div className={styles.selectedTagsSection}>
              <p className={styles.selectedTagsSectionTitle}>문제 풀기</p>
              <div className={styles.horizontalLine} />
              <div className={styles.selectedTagsBox}>
                <span className={styles.selectedTagsTitle}>선택된 문제 종류</span>
                <button className={styles.tagsResetBtn} onClick={resetSelectedTags}>
                  필터 초기화 X
                </button>
                <div className={styles.horizontalTagLine} />
                <div className={styles.selectedTags}>{showSelectedTags}</div>
                <button onClick={getQuizzes} className={styles.quizStart}>
                  시작
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetQuizOptions
