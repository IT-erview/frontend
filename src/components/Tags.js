import { useEffect, useState } from 'react'
import 'css/Tags.css'
import axios from 'axios'

const Tags = (props) => {
  const [selectedTag, setSelectedTag] = useState([])
  const [tagItems, setTagItems] = useState([])

  const selectThisTag = (e) => {
    setSelectedTag(selectedTag.concat(e.target.id))
  }
  const deselectThisTag = (e) => {
    setSelectedTag(selectedTag.filter((element) => element !== e.target.id))
  }

  const getTags = () => {
    fetch('/api/v1/tag/')
      .then((res) => {
        return res.json()
      })
      .catch((err) => {
        console.log(err)
        localStorage.setItem('tags', [])
      })
      .then((json) => {
        setTagItems(json)
        console.log(tagItems)
        localStorage.setItem('tags', JSON.stringify(json))
      })
  }
  useEffect(() => {
    getTags()
    if (localStorage.getItem('questionSearchTag')) {
      setSelectedTag(JSON.parse(localStorage.getItem('questionSearchTag')))
    }
  }, [])

  useEffect(() => {
    if (props.page === 'question-register') {
      localStorage.setItem('questionRegiTag', JSON.stringify(selectedTag))
    } else if (props.page === 'question-search') {
      localStorage.setItem('questionSearchTag', JSON.stringify(selectedTag))
    } else if (props.page === 'main-question-search') {
      localStorage.setItem('questionSearchTag', JSON.stringify(selectedTag))
    }
  })

  const TagButtons = tagItems.map((tagItem) => {
    if (selectedTag && selectedTag.includes(tagItem.tagTitle)) {
      return (
        <button
          className="classification-tag-selected"
          key={tagItem.tagId}
          id={tagItem.tagTitle}
          onClick={deselectThisTag}>
          {tagItem.tagTitle}
        </button>
      )
    } else {
      return (
        <button
          className="classification-tag-unselected"
          key={tagItem.tagId}
          id={tagItem.tagTitle}
          onClick={selectThisTag}>
          {tagItem.tagTitle}
        </button>
      )
    }
  })

  return <div className="classification-tag-btn">{TagButtons}</div>
}

export default Tags
