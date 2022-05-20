// react
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// util
import { Question, TagSelectorItem } from 'utils/type'
// style
import 'views/mypage/style/MyBookmarkQuestion.sass'
import 'views/mypage/style/MypageFilter.sass'
// redux
import { ReducerType } from 'modules/rootReducer'
import { setQuizTagSelected } from 'modules/quizTags'
// api
import { getBookmarks } from 'api/bookmark'
// component
import QuestionList from 'views/common/question/QuestionList'
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'

const MyBookmarkQuestion = () => {
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)
  const [questions, setQuestions] = useState<Array<Question>>([])

  const tagToggle = () => setFilterDropdownOpen((prevState) => !prevState)
  const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false)

  const dispatch = useDispatch()
  const selectTag = (tagId: number, isSelected: boolean) => {
    dispatch(setQuizTagSelected({ tagId, isSelected: !isSelected }))
  }

  useEffect(() => {
    const initQuestions = async () => {
      let params = {
        sort: `${sort}`,
        page: 0,
        size: 30,
      }
      let bookmarkList = await getBookmarks(params)
      setQuestions(bookmarkList.data)
    }
    initQuestions()
  }, [sort])

  const dropDownSort = (
    <div className="dropdown-common dropdown-sort-wrap">
      <div className={'checkbox-wrap'}>
        <input type="checkbox" id="popular" name="sort" />
        <label htmlFor="popular">인기순</label>
      </div>
      <div className={'checkbox-wrap'}>
        <input type="checkbox" id="latest" name="sort" />
        <label htmlFor="latest">최신순</label>
      </div>
      <div className={'checkbox-wrap'}>
        <input type="checkbox" id="older" name="sort" />
        <label htmlFor="older">오래된 순</label>
      </div>
    </div>
  )

  const dropdownTag = quizTags.map((tag: TagSelectorItem) => (
    <div className={'checkbox-wrap'} key={tag.id}>
      <input
        className={`${tag.isSelected ? 'selected' : ''} input-option`}
        type="checkbox"
        id={tag.name}
        name={tag.name}
        onChange={() => selectTag(tag.id, tag.isSelected)}
      />
      <label htmlFor={tag.name}>{tag.name}</label>
    </div>
  ))

  return (
    <div className="mypage-bookmark-wrap">
      <div className={'mypage-filter-wrap'}>
        <div className={'mypage-filter-compact'}>
          <span className={'compact-title'}>필터 설정하기</span>
          <div className={'compact-handler'}>
            <button className={'btn-dropdown-reset'}>필터 초기화 X</button>
            <button className={'btn-dropdown'} onClick={tagToggle}>
              <img
                src="img/dropdown_white.png"
                alt="dropdownArrow"
                className={`${filterDropdownOpen ? '' : 'active'} icon-dropdown`}
              />
            </button>
          </div>
        </div>
        <div className={`${filterDropdownOpen ? 'show' : ''} dropdown-box`}>
          {filterDropdownOpen ? dropDownSort : null}
          <div className={'dropdown-common dropdown-tag-wrap'}>{filterDropdownOpen ? dropdownTag : null}</div>
        </div>
      </div>
      <QuestionList questions={questions} />
      <div className="mypage-register-bookmark-title">
        <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
      </div>
    </div>
  )
}

export default MyBookmarkQuestion
