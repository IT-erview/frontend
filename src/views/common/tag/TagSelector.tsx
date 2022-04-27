// todo: refactoring
// react
import { useEffect, useState } from 'react'
// util
import { TagSelectorItem } from 'utils/type'
// style
import 'views/common/tag/Tags.css'

const TagSelector = (props: {
  tags: Array<TagSelectorItem>
  onTagSelect: (tagId: number, isSelected: boolean) => void
}) => {
  const [tags, setTags] = useState(props.tags)

  const toggle = (tagId: number, isSelected: boolean) => {
    props.onTagSelect(tagId, isSelected)
    setTags(tags.map((tag) => (tag.id === tagId ? { ...tag, isSelected } : tag)))
  }

  useEffect(() => {
    setTags(props.tags)
  }, [props.tags])

  return (
    <div className="classification-tag-btn">
      {tags.map((tag) => {
        return (
          <button
            className={tag.isSelected ? 'classification-tag-selected' : 'classification-tag-unselected'}
            key={tag.id}
            onClick={() => toggle(tag.id, !tag.isSelected)}>
            {tag.name}
          </button>
        )
      })}
    </div>
  )
}

export default TagSelector
