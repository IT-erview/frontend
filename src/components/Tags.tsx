// todo: refactoring
import tagItems from 'constants/TagItems'
import 'css/Tags.css'
import { useDispatch, useSelector } from 'react-redux'
import { addRegisterTag, deleteRegisterTag } from 'modules/registerTags'
import { addSearchTag, deleteSearchTag } from 'modules/searchTags'
import { ReducerType } from 'modules/rootReducer'
import { useState } from 'react'

const Tags = (props: { page: 'question-register' | 'question-search' }) => {
  const dispatch = useDispatch()
  const alreadyTag = useSelector<ReducerType, Array<string>>((state) =>
    props.page === 'question-register' ? state.registerTags : state.searchTags,
  )
  const [selectedTag, setSelectedTag] = useState(alreadyTag)
  console.log(selectedTag)

  const selectTag = (e: any) => {
    switch (props.page) {
      case 'question-register':
        dispatch(addRegisterTag(e.target.id))
        break
      case 'question-search':
        dispatch(addSearchTag(e.target.id))
        break
    }
    setSelectedTag(selectedTag.concat(e.target.id))
  }
  const deselectTag = (e: any) => {
    switch (props.page) {
      case 'question-register':
        dispatch(deleteRegisterTag(e.target.id))
        break
      case 'question-search':
        dispatch(deleteSearchTag(e.target.id))
        break
    }
    setSelectedTag(selectedTag.filter((element) => element !== e.target.id))
  }

  const TagButtons = tagItems.map((tagItem) => {
    if (selectedTag && selectedTag.includes(tagItem.name)) {
      return (
        <button className="classification-tag-selected" key={tagItem.id} id={tagItem.name} onClick={deselectTag}>
          {tagItem.name}
        </button>
      )
    } else {
      return (
        <button className="classification-tag-unselected" key={tagItem.id} id={tagItem.name} onClick={selectTag}>
          {tagItem.name}
        </button>
      )
    }
  })

  return <div className="classification-tag-btn">{TagButtons}</div>
}

export default Tags
