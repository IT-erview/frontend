// todo: refactoring
// import 'css/SetQuizOptions.css'
import { useCallback, useEffect, useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import QuizSolving from 'components/QuizSolving'
import { Question, TagCount, TagSelectorItem } from 'common/type'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import { getQuestionStat, getQuizQuestions } from 'common/api'
import { setQuizTagSelected } from 'modules/quizTags'
import styles from 'css/Quiz.module.css'

const SetQuizOptions = () => {
  const [tagDropdownOpen, setTagDropdownOpen] = useState<boolean>(false)
  const [cntDropdownOpen, setCntDropdownOpen] = useState<boolean>(false)
  const tagToggle = () => setTagDropdownOpen((prevState) => !prevState)
  const cntToggle = () => setCntDropdownOpen((prevState) => !prevState)
  const [quizCount, setQuizCount] = useState<number>(0)
  const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)
  const userName = localStorage.getItem('userName') as string
  const userImgUrl = localStorage.getItem('userImgUrl') as string
  const userEmail = localStorage.getItem('userEmail') as string
  const dispatch = useDispatch()
  const quizMinToMax = Array.from({ length: 26 }, (v, i) => i + 5)
  const [tagStat, setTagStat] = useState<Array<TagCount>>([])
  const [quizzes, setQuizzes] = useState<Array<Question>>([])
  // todo: 리팩토링 필요
  const selectTag = (tagId: number) => {
    const tagIndex = tagId - 1
    if (quizTags[tagIndex].isSelected) {
      alert('이미 선택된 태그입니다.')
    } else {
      dispatch(setQuizTagSelected({ tagId, isSelected: true }))
    }
  }
  const deselectTag = (tagId: number) => {
    dispatch(setQuizTagSelected({ tagId, isSelected: false }))
  }
  const getQuizzes = async () => {
    setQuizzes(
      await getQuizQuestions(
        quizCount,
        quizTags.filter((tag) => tag.isSelected).map((tag) => tag.name),
      ),
    )
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

  useEffect(() => {
    getQuestionTagStat()
  }, [getQuestionTagStat])

  return (
    <div>
      {quizzes.length === 0 ? (
        <div>
          <div className="set-quiz-options">
            <div className="set-quiz-options-box">
              <div className="user-info">
                <div className={styles.userInfo}>
                  {/* Todo: imgUrl 없다면 기본 프로필 사진으로 대체 */}
                  <div className={styles.userProfileSection}>
                    <img src={userImgUrl} alt="userProfileImg" className={styles.userProfileImg}></img>
                    <div>
                      <p className={styles.userName}>{userName} 님</p>
                      <p className={styles.userEmail}>{userEmail}</p>
                    </div>
                  </div>
                  <div className={styles.line} />
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
                  <div className={styles.line} />
                  <div className={styles.userTagsSection}>
                    <p className={styles.userTagsTitle}>많이 푼 문제 종류</p>
                    <div className={styles.userTags}>
                      {showTagStat}
                      {tagStat.length > 3 ? '...' : tagStat.length > 0 ? null : <div className={styles.noneBtn}></div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="select-tag">
                <div className="select-tag-content">
                  <h4>
                    퀴즈태그<span className="comments">*미선택시 랜덤출제</span>
                  </h4>

                  <hr className="line" />
                  <Dropdown isOpen={tagDropdownOpen} toggle={tagToggle}>
                    <DropdownToggle className="quiz-dropdown" caret>
                      태그 선택
                    </DropdownToggle>
                    <DropdownMenu className="quiz-dropdown-menu">
                      {quizTags.map((tag, i) => {
                        return (
                          <DropdownItem key={i} onClick={() => selectTag(tag.id)} id={tag.name}>
                            {tag.name}
                          </DropdownItem>
                        )
                      })}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              <div className="select-quiz-count">
                <div className="select-quiz-count-content">
                  <h4>갯수</h4>
                  <hr className="line" />
                  <Dropdown isOpen={cntDropdownOpen} toggle={cntToggle}>
                    <DropdownToggle className="quiz-dropdown" caret>
                      퀴즈 갯수 선택
                    </DropdownToggle>
                    <DropdownMenu className="quiz-dropdown-menu">
                      {quizMinToMax.map((cnt: number, index) => {
                        return (
                          <DropdownItem key={index} onClick={() => setQuizCount(cnt)}>
                            {cnt}
                          </DropdownItem>
                        )
                      })}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="quiz-setting-result-box">
              <div>
                <h4>선택된 퀴즈 태그</h4>
                <hr className="two-line" />
                {quizTags.map((tag: TagSelectorItem) => {
                  return (
                    tag.isSelected && (
                      <Button
                        className="selected-tag-btn"
                        key={tag.id}
                        id={tag.name}
                        onClick={() => deselectTag(tag.id)}>
                        {tag.name} ⅹ
                      </Button>
                    )
                  )
                })}
              </div>
              <div>
                <h4>선택된 퀴즈 수</h4>
                <hr className="two-line" />
                <span className="quiz-cnt">{quizCount}</span>
                <span>개</span>
              </div>
              <Button className="quiz-start-btn" onClick={getQuizzes}>
                시작하기
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <QuizSolving quizzes={quizzes}></QuizSolving>
      )}
    </div>
  )
}

export default withRouter(SetQuizOptions)
