import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TagSelectorItem } from 'utils/type'
import 'views/common/tag/TagDropdown.sass'

const TagDropdown = (props: { tags: Array<TagSelectorItem>; setTagSelected: Function }) => {
  const dispatch = useDispatch()

  const selectTag = (tagId: number, isSelected: boolean) => {
    dispatch(props.setTagSelected({ tagId, isSelected: !isSelected }))
  }

  const resetSelectedTags = () => {
    props.tags.forEach((tag: TagSelectorItem) => {
      if (tag.isSelected) selectTag(tag.id, tag.isSelected)
    })
  }
  const [tagDropdownOpen, setTagDropdownOpen] = useState<boolean>(false)
  const tagToggle = () => setTagDropdownOpen((prevState) => !prevState)

  const dropdown = props.tags.map((tag: TagSelectorItem) => (
    <div className={'checkbox-wrap'} key={tag.id}>
      <input
        className={'input-option'}
        type="checkbox"
        id={tag.name}
        name={tag.name}
        onChange={() => selectTag(tag.id, tag.isSelected)}
      />
      <label htmlFor={tag.name} className={`${tag.isSelected ? 'selected' : ''} label-option`}>
        <span className={'icon-checkbox'} />
        <p>{tag.name}</p>
      </label>
    </div>
  ))

  return (
    <div className={'dropdown-box-wrap'}>
      <div className={'dropdown-box-compact'}>
        <span className={'compact-title'}>문제 종류</span>
        <div className={'compact-handler'}>
          <button className={'btn-dropdown-reset'} onClick={resetSelectedTags}>
            필터 초기화 X
          </button>
          <button className={'btn-dropdown'} onClick={tagToggle}>
            <img
              src="img/dropdown.png"
              alt="dropdownArrow"
              className={`${tagDropdownOpen ? 'active' : ''} icon-dropdown`}
            />
          </button>
        </div>
      </div>
      <div className={`${tagDropdownOpen ? 'show' : ''} dropdown-box`}>{tagDropdownOpen ? dropdown : null}</div>
    </div>
  )
}

export default TagDropdown
