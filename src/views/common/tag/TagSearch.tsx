// react
import { useEffect, useState } from 'react'
// util
import { MAX_SEARCH_TAG_LENGTH } from 'utils/config'
import { TagSelectorItem } from 'utils/type'
//style
import 'views/common/tag/TagSearch.sass'
// redux
import { ReducerType } from 'modules/rootReducer'
import { setSearch, setSearchKeyword, setSearchTagSelected } from 'modules/search'
import { useDispatch, useSelector } from 'react-redux'

// router-dom
import { useHistory, useLocation } from 'react-router-dom'
// component
//api

const TagSearch = () => {
  const [text, setText] = useState('')
  const location = useLocation()
  const history = useHistory()
  const searchTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.search.tags)
  const [searchingTags, setSearchingTags] = useState<Array<TagSelectorItem>>([])
  const [selectedTags, setSelectedTags] = useState<Array<TagSelectorItem>>(searchTags.filter((tag) => tag.isSelected))
  const dispatch = useDispatch()
  const onTagSelect = (tagId: number, isSelected: boolean) => dispatch(setSearchTagSelected({ tagId, isSelected }))

  // const searchKeywords = useSelector<ReducerType, string>((state) => state.searchKeywords)

  const selectTag = (tag: TagSelectorItem) => {
    onTagSelect(tag.id, !tag.isSelected)
    dispatch(setSearch(true))
    if (text === tag.name) {
      setText('')
    }
    if (tag.isSelected) {
      setSelectedTags(selectedTags.filter((item) => item.id !== tag.id))
    } else {
      setSelectedTags([...selectedTags, { id: tag.id, name: tag.name, isSelected: !tag.isSelected }])
    }
  }

  const findTags = (tags: Array<TagSelectorItem>, text: string) => {
    const result = [] as Array<TagSelectorItem>
    tags.forEach((tag) => {
      const tagNameLower = tag.name.toLowerCase()
      const textLower = text.toLowerCase()
      if (tagNameLower.indexOf(textLower) !== -1) result.push(tag)
    })
    if (result.length === 0) return tags
    else return result
  }

  const resetSelectedTags = () => {
    selectedTags.forEach((tag) => {
      onTagSelect(tag.id, !tag.isSelected)
    })
    dispatch(setSearch(true))
    dispatch(setSearchKeyword(''))
    setText('')
    setSelectedTags([])
  }

  const searchQuestions = () => {
    dispatch(setSearch(true))
    dispatch(setSearchKeyword(text))
    if (location.pathname !== '/QuestionSearch') {
      history.push('/QuestionSearch')
    }
  }

  const showTags = searchingTags.map((tag, index) => {
    return (
      <li key={index}>
        <button onClick={() => selectTag(tag)} className={`${tag.isSelected ? 'selected' : ''} tag`}>
          {tag.name}
        </button>
      </li>
    )
  })

  const showSelectedTags = selectedTags.map((tag, index) => {
    return (
      <li key={index}>
        <button className={'selected-tag'} onClick={() => selectTag(tag)}>
          {tag.name} X
        </button>
      </li>
    )
  })

  useEffect(() => {
    setSearchingTags(findTags(searchTags, text))
  }, [searchTags, text])

  return (
    <article className={'search-wrap'}>
      <div className={'search-box'}>
        <div className={'search-input-wrap'}>
          <input
            type="text"
            maxLength={MAX_SEARCH_TAG_LENGTH}
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
            placeholder="태그 혹은 검색어를 입력해주세요."
            className={'search-input'}
          />
          <button onClick={searchQuestions} className={'search-button'}>
            검색하기
          </button>
        </div>
        <p className={'search-information'}>
          일일이 찾아야 했던 면접 질문과 답변들, 검증되지 않았던 정보들, 한 번에 검색하고 검증된 정보를 받아보세요.
        </p>
      </div>
      {selectedTags.length > 0 && (
        <div className={'selected-tag-wrap'}>
          <ul>{showSelectedTags}</ul>
          <button onClick={resetSelectedTags} className={'btn-reset'}>
            태그 초기화 X
          </button>
        </div>
      )}
      <div className={'tag-wrap'}>
        <ul>{showTags}</ul>
      </div>
    </article>
  )
}

export default TagSearch
