// todo: refactoring
// import 'css/SetQuizOptions.css'
import { useCallback, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import QuizSolving from 'components/QuizSolving'
import { QuizQuestion, TagCount, TagSelectorItem } from 'common/type'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import { getQuestionStat, getQuizQuestions } from 'common/api'
import { setQuizTagSelected } from 'modules/quizTags'
import styles from 'css/Quiz.module.css'

const SetQuizOptions = () => {
  const [tagDropdownOpen, setTagDropdownOpen] = useState<boolean>(false)
  const tagToggle = () => setTagDropdownOpen((prevState) => !prevState)
  const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)
  const userName = localStorage.getItem('userName') as string
  const userImgUrl = localStorage.getItem('userImgUrl') as string
  const userEmail = localStorage.getItem('userEmail') as string
  const dispatch = useDispatch()
  const [tagStat, setTagStat] = useState<Array<TagCount>>([])
  const [quizzes, setQuizzes] = useState<QuizQuestion | null>(null)
  // todo: 리팩토링 필요
  const selectTag = (tagId: number, isSelected: boolean) => {
    dispatch(setQuizTagSelected({ tagId, isSelected: !isSelected }))
  }
  const deselectTag = (tagId: number) => {
    dispatch(setQuizTagSelected({ tagId, isSelected: false }))
  }
  const getQuizzes = async () => {
    const getQuiz = await getQuizQuestions(quizTags.filter((tag) => tag.isSelected).map((tag) => tag.id))
    if (getQuiz) setQuizzes(getQuiz)
  }

  const getQuestionTagStat = useCallback(async () => {
    const questionStat = await getQuestionStat()
    if (questionStat) {
      setTagStat(questionStat)
    }
  }, [setTagStat])

  const showTagStat = tagStat.map((tag, index) => {
    if (index < 3)
      return (
        <div key={index} className={styles.userTag}>
          {tag.tagTitle}
        </div>
      )
    else return null
  })
  const showSelectedTags = quizTags.map((tag, index) => {
    if (tag.isSelected)
      return (
        <button key={index} onClick={() => deselectTag(tag.id)} className={styles.selectedTag}>
          {tag.name} X
        </button>
      )
    else return null
  })

  const resetSelectedTags = () => {
    quizTags.forEach((tag) => {
      if (tag.isSelected) deselectTag(tag.id)
    })
  }

  const quizDropdown = quizTags.map((tag) => {
    return (
      <div className={styles.tag} key={tag.id}>
        <input type="checkbox" id={tag.name} name={tag.name} onChange={() => selectTag(tag.id, tag.isSelected)} />
        <label htmlFor={tag.name} className={tag.isSelected ? styles.tagNameSelected : styles.tagNameDeselected}>
          <div className={tag.isSelected ? styles.checkboxSelected : styles.checkboxDeselected} />
          {tag.name}
        </label>
      </div>
    )
  })

  useEffect(() => {
    getQuestionTagStat()
  }, [getQuestionTagStat])

  return (
    <div>
      {!quizzes ? (
        <div>
          <div className={styles.userInfo}>
            {/* Todo: imgUrl 없다면 기본 프로필 사진으로 대체 */}
            <div className={styles.userProfileSection}>
              <img src={userImgUrl} alt="userProfileImg" className={styles.userProfileImg}></img>
              <div>
                <p className={styles.userName}>{userName} 님</p>
                <p className={styles.userEmail}>{userEmail}</p>
              </div>
            </div>
            <div className={styles.verticalLine} />
            <div className={styles.userDetailSection}>
              {/* Todo: 실제 데이터로 교체 */}
              <div className={styles.userDetailTitle}>
                <p>퀴즈로 푼 문제</p>
                <p>좋아요</p>
              </div>
              <div className={styles.userDetailCnt}>
                <p>170</p>
                <p>50</p>
              </div>
            </div>
            <div className={styles.verticalLine} />
            <div className={styles.userTagsSection}>
              <p className={styles.userTagsTitle}>많이 푼 문제 종류</p>
              <div className={styles.userTags}>
                {showTagStat}
                {tagStat.length > 3 ? '...' : tagStat.length > 0 ? null : '대체 텍스트'}
              </div>
            </div>
          </div>

          <div className={styles.selectTagsBox}>
            <p className={styles.selectTagsTitle}>문제 종류</p>
            <div className={styles.horizontalLine} />
            <div className={styles.selectTagsCheckbox}>
              <span className={styles.checkboxTitle}>문제 종류</span>
              <button className={styles.dropdownBtn} onClick={tagToggle}>
                <img
                  src="img/dropdown.png"
                  alt="dropdownArrow"
                  className={tagDropdownOpen ? styles.dropdownArrowToggle : styles.dropdownArrow}
                />
              </button>
              <button className={styles.tagsResetCheckboxBtn} onClick={resetSelectedTags}>
                필터 초기화 X
              </button>
            </div>
            <div className={tagDropdownOpen ? styles.dropdownOpen : styles.dropdownClose}>
              <div className={styles.dropdownTags}>{tagDropdownOpen ? quizDropdown : null}</div>
            </div>

            <div className={styles.selectedTagsSection}>
              <p className={styles.selectedTagsTitle}>문제 풀기</p>
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
      ) : (
        <>
          <QuizSolving quizzes={quizzes}></QuizSolving>
        </>
      )}
    </div>
  )
}

export default withRouter(SetQuizOptions)
