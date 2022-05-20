// react
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// util
import { TagSelectorItem } from 'utils/type'
// style
import 'views/mypage/style/MypageFilter.sass'
// redux
import { ReducerType } from 'modules/rootReducer'
import { setQuizTagSelected } from 'modules/quizTags'

const MypageFilter = () => {
  const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)
  const dispatch = useDispatch()
  const selectTag = (tagId: number, isSelected: boolean) => {
    dispatch(setQuizTagSelected({ tagId, isSelected: !isSelected }))
  }
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false)
  const tagToggle = () => setFilterDropdownOpen((prevState) => !prevState)

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
        <div className="dropdown-common dropdown-tag-wrap">{filterDropdownOpen ? dropdownTag : null}</div>
      </div>
    </div>
  )
}

export default MypageFilter
