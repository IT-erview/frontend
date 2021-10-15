// todo: refactoring
import 'css/Tags.css'
import { useState } from 'react'
import { TagForFrontend } from 'common/type'

const TagSelector = (props: {
  tags: Array<TagForFrontend>
  onTagSelect: (tagId: number, isSelected: boolean) => void
}) => {
  const [tags, setTags] = useState(props.tags)

  const toggle = (tagId: number, isSelected: boolean) => {
    props.onTagSelect(tagId, isSelected)
    setTags(tags.map((tag) => (tag.id === tagId ? { ...tag, isSelected } : tag)))
  }

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
