import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { TagSelectorItem } from 'utils/type'
import 'views/common/tag/TagDropdown.sass'
import { MAX_SEARCH_TAG_LENGTH } from 'utils/config'

const TagDropdown = (props: { tags: Array<TagSelectorItem>; setTagSelected: Function }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [searchingTags, setSearchingTags] = useState<Array<TagSelectorItem>>([])

  const selectTag = (tagId: number, isSelected: boolean) => {
    dispatch(props.setTagSelected({ tagId, isSelected: !isSelected }))
  }

  useEffect(() => {
    const findTags = (tags: Array<TagSelectorItem>, text: string) => {
      const result = [] as Array<TagSelectorItem>
      props.tags.forEach((tag) => {
        const tagNameLower = tag.name.toLowerCase()
        const textLower = text.toLowerCase()
        if (tagNameLower.indexOf(textLower) !== -1) result.push(tag)
      })
      if (result.length === 0) return tags
      else return result
    }
    setSearchingTags(findTags(props.tags, text))
  }, [props.tags, text])

  const showTags = searchingTags.map((tag: TagSelectorItem) => (
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
    <div className={'dropdown-box-wrap'}>
      <div className={'dropdown-box-compact'}>
        <img src="img/nav_icon3.png" alt="search" className={'tag-search'} />
        <input
          type="text"
          maxLength={MAX_SEARCH_TAG_LENGTH}
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
          placeholder="문제 태그를 검색해보세요."
          className={'compact-title'}
        />
      </div>
      <div className={`show dropdown-box`}>{showTags}</div>
    </div>
  )
}

export default TagDropdown
