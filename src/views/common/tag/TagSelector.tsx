// todo: refactoring
import { useEffect, useState } from 'react'
import { TagSelectorItem } from 'utils/type'
import 'views/common/tag/Tags.sass'

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
    <div className={'tag-list-wrap'}>
      {tags.map((tag) => {
        return (
          <button
            className={`${tag.isSelected ? 'selected' : ''} tag`}
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
