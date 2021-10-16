// todo: refactoring
import 'css/SetQuizOptions.css'
import { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import tagItems from 'constants/TagItems'
import QuizSolving from 'components/QuizSolving'
import { Question, TagSelectorItem } from 'common/type'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
import { getQuizQuestions } from 'common/api'
import { setQuizTagSelected } from 'modules/quizTags'

const SetQuizOptions = () => {
  const [tagDropdownOpen, setTagDropdownOpen] = useState<boolean>(false)
  const [cntDropdownOpen, setCntDropdownOpen] = useState<boolean>(false)
  const tagToggle = () => setTagDropdownOpen((prevState) => !prevState)
  const cntToggle = () => setCntDropdownOpen((prevState) => !prevState)
  const [quizCount, setQuizCount] = useState<number>(0)
  const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)
  const dispatch = useDispatch()
  const quizMinToMax = Array.from({ length: 26 }, (undefined, i) => i + 5)

  const [quizzes, setQuizzes] = useState<Array<Question>>([])
  // todo: 리팩토링 필요
  const selectTag = (tag: React.MouseEvent<HTMLElement>) => {
    const tagName = (tag.target as HTMLElement).id as string
    const tagIndex = quizTags.findIndex((tag) => tag.name === tagName) as number
    if (quizTags[tagIndex].isSelected) {
      alert('이미 선택된 태그입니다.')
    } else {
      const tagId = quizTags[tagIndex].id
      dispatch(setQuizTagSelected({ tagId, isSelected: true }))
    }
  }
  const deselectTag = (tag: React.MouseEvent<HTMLElement>) => {
    const tagName = (tag.target as HTMLElement).id as string
    const tagIndex = quizTags.findIndex((tag) => tag.name === tagName) as number
    const tagId = quizTags[tagIndex].id

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

  return (
    <div>
      {quizzes.length === 0 ? (
        <div>
          <div id="quiz-info-detail">
            풀고싶은
            <br />
            문제종류와 갯수를
            <br />
            선택해주세요!
          </div>
          <div className="set-quiz-options">
            <div className="set-quiz-options-box">
              <div className="user-info">
                <div className="user-info-content">
                  <h4>{localStorage.getItem('userName')}</h4>
                  <hr className="line" />
                  <h6>문제당 평균 시간</h6>
                  <span>02:50</span>
                  <h6>좋아요</h6>
                  <span>50</span>
                  <h6>퀴즈로 푼 문제</h6>
                  <span>170</span>
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
                      {tagItems.map((tagItem, i) => {
                        return (
                          <DropdownItem key={i} onClick={selectTag} id={tagItem.name}>
                            {tagItem.name}
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
                      <Button className="selected-tag-btn" key={tag.id} id={tag.name} onClick={deselectTag}>
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
