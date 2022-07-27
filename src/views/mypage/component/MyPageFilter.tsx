// react
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// util
import { TagSelectorItem } from 'utils/type'
// style
import 'views/mypage/style/MypageFilter.sass'
// redux
import { ReducerType } from 'modules/rootReducer'
import { Sort } from '../../common/form/SortSelectBox'
import { filter, setFilterSort, setFilterTagSelected } from 'modules/searchFilter'

const MypageFilter = () => {
  const filter = useSelector<ReducerType, filter>((state) => state.searchFilter)
  const dispatch = useDispatch()
  const selectTag = (tagId: number, isSelected: boolean) => {
    dispatch(setFilterTagSelected({ tagId, isSelected: !isSelected }))
  }
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false)
  const tagToggle = () => setFilterDropdownOpen((prevState) => !prevState)

  // const [selectedSort, setSelectedSort] = useState<Sort>(Sort.POPULAR)
  const selectSort = (sort: Sort) => {
    dispatch(setFilterSort(sort))
  }

  const dropDownSort = (
    <div className="dropdown-common dropdown-sort-wrap">
      <div className={'radio-wrap'}>
        <input type="radio" id="popular" name="sort" value={Sort.POPULAR} onChange={() => selectSort(Sort.POPULAR)} />
        <label htmlFor="popular">인기순</label>
      </div>
      <div className={'radio-wrap'}>
        <input type="radio" id="latest" name="sort" value={Sort.LATEST} onChange={() => selectSort(Sort.LATEST)} />
        <label htmlFor="latest">최신순</label>
      </div>
      <div className={'radio-wrap'}>
        <input type="radio" id="older" name="sort" value={Sort.LATEST} onChange={() => selectSort(Sort.LATEST)} />
        <label htmlFor="older">오래된 순</label>
      </div>
    </div>
  )

  const dropdownTag = filter.tags.map((tag: TagSelectorItem) => (
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

  const resetFilter = () => {
    filter.tags.forEach((tag: TagSelectorItem) => {
      if (tag.isSelected) selectTag(tag.id, tag.isSelected)
    })
  }

  return (
    <div className={'mypage-filter-wrap'}>
      <div className={'mypage-filter-compact'}>
        <span className={'compact-title'}>필터 설정하기</span>
        <div className={'compact-handler'}>
          <button className={'btn-dropdown-reset'} onClick={resetFilter}>
            필터 초기화 X
          </button>
          <button className={'btn-dropdown'} onClick={tagToggle}>
            <img
              src="img/dropdown_white.png"
              alt="dropdownArrow"
              className={`${filterDropdownOpen ? '' : 'active'} icon-dropdown`}
            />
          </button>
        </div>
      </div>
      <div className={`dropdown-box ${filterDropdownOpen ? 'show' : ''}`}>
        {filterDropdownOpen ? dropDownSort : null}
        <div className="dropdown-common dropdown-tag-wrap">{filterDropdownOpen ? dropdownTag : null}</div>
      </div>
    </div>
  )
}

export default MypageFilter
