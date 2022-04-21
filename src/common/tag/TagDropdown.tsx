import styles from 'quiz/css/Quiz.module.css'
import { TagSelectorItem } from 'common/type'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

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
    <div className={styles.tag} key={tag.id}>
      <input
        className={styles.quizInput}
        type="checkbox"
        id={tag.name}
        name={tag.name}
        onChange={() => selectTag(tag.id, tag.isSelected)}
      />
      <label htmlFor={tag.name} className={tag.isSelected ? styles.tagNameSelected : styles.tagNameDeselected}>
        <div className={tag.isSelected ? styles.checkboxSelected : styles.checkboxDeselected} />
        {tag.name}
      </label>
    </div>
  ))

  return (
    <>
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
        <div className={styles.dropdownTags}>{tagDropdownOpen ? dropdown : null}</div>
      </div>
    </>
  )
}

export default TagDropdown
