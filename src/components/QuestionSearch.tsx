// todo: refactoring
import 'css/QuestionSearch.css'
import Tags from 'components/Tags'
import { useState } from 'react'
import { Input } from 'reactstrap'
import QuestionList from 'components/QuestionList'
import SortSelectBox, { Sort } from './SortSelectBox'
import { MAX_SEARCH_WORD_LENGTH } from 'common/config'

// 이미지로 대체 필요
const searchIcon = () => {
  return (
    <div className="search-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="13.455" height="14.982" viewBox="0 0 13.455 14.982">
        <g id="그룹_2183" data-name="그룹 2183" transform="translate(-110.75 -693.75)">
          <g
            id="타원_4"
            data-name="타원 4"
            transform="translate(110.75 693.75)"
            fill="none"
            stroke="#554da0"
            strokeLinecap="round"
            strokeWidth="1">
            <circle cx="5.5" cy="5.5" r="5.5" stroke="none" />
            <circle cx="5.5" cy="5.5" r="5" fill="none" />
          </g>
          <line
            id="선_9"
            data-name="선 9"
            x2="4.029"
            y2="4.616"
            transform="translate(119.471 703.41)"
            fill="none"
            stroke="#554da0"
            strokeLinecap="round"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  )
}
// <-- xd 복붙 끝

const getQuestionSearchTags = (): Array<string> => {
  const storageQuestionSearchTags = localStorage.getItem('questionSearchTag')
  if (typeof storageQuestionSearchTags === 'string') return JSON.parse(storageQuestionSearchTags)
  return []
}

const QuestionSearch = () => {
  const [questionSearchWord, setQuestionSearchWord] = useState<string>('')
  const [questionSearchInput, setQuestionSearchInput] = useState<string>('')
  const [questionSearchTags, setQuestionSearchTags] = useState<Array<string>>([])
  const [sort, setSort] = useState<Sort>(Sort.LIKED)

  const setQuestionSearch = () => {
    setQuestionSearchTags(getQuestionSearchTags)
    setQuestionSearchWord(questionSearchInput)
    setQuestionSearchInput('')
  }

  return (
    <div className="question-search">
      <div className="question-search-info-detail">
        알고싶은
        <br />
        문제종류와 키워드를
        <br />
        검색하세요!
      </div>
      <div className="question-search-tag">
        <img src="img/figure1.png" alt="question-search-tag-icon" />
        <span>문제 검색</span>
        <div className="question-tag-hr"></div>
        <Tags className="question-tags" page="question-search" />
      </div>
      <div className="question-search-word">
        <Input
          id="question-search-input"
          type="textarea"
          value={questionSearchInput}
          maxLength={MAX_SEARCH_WORD_LENGTH}
          onChange={(e) => {
            setQuestionSearchInput(e.target.value)
          }}
          placeholder="관련어를 검색해주세요"
        />
        {searchIcon()}
        <button onClick={setQuestionSearch}>검색하기</button>
      </div>
      <div className="searched-question">
        <div className="title-sort">
          <img src="img/figure3.png" alt="question-search-tag-icon" />

          <span>검색된 면접 문제</span>
          <div className="sort-button">
            <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
            <div className="question-search-hr" />
          </div>
        </div>
        <div className="question-section">
          <QuestionList
            tagList={questionSearchTags}
            sort={sort === Sort.LIKED ? 'bookmarkCount' : 'createdDate'}
            keyword={questionSearchWord}
            type={'search'}
          />
        </div>
      </div>
    </div>
  )
}
export default QuestionSearch
