// todo: refactoring
// react
import { useEffect, useState, useCallback } from 'react'
import { Input } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from 'modules/rootReducer'
// util
import { Question, TagSelectorItem } from 'utils/type'
import { MAX_SEARCH_WORD_LENGTH } from 'utils/config'
// style
import 'views/search/css/QuestionSearch.css'
// api
import { searchQuestions } from 'api/question'
//component
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'
import TagSelector from 'views/common/tag/TagSelector'
import { setSearchTagSelected } from 'modules/searchTags'
import QuestionList from 'views/common/question/QuestionList'

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

const QuestionSearch = () => {
  const dispatch = useDispatch()
  const [questionSearchInput, setQuestionSearchInput] = useState<string>('')

  const questionSearchTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.searchTags)
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)
  const [questions, setQuestions] = useState<Array<Question>>([])

  const search = useCallback(async () => {
    let params = {
      keyword: questionSearchInput,
      tags: questionSearchTags.filter((tag) => tag.isSelected).map((tag) => tag.id),
      page: 0,
      size: 0,
      sort: `${sort},desc`,
    }
    searchQuestions(params).then((res: any) => {
      setQuestions(res.data)
      setQuestionSearchInput('')
    })
    // const searchResults = await searchQuestions(
    //   questionSearchInput,
    //   sort,
    //   questionSearchTags.filter((tag) => tag.isSelected).map((tag) => tag.id),
    // )
    // setQuestions(searchResults)
    // setQuestionSearchInput('')
  }, [questionSearchInput, questionSearchTags, sort])

  useEffect(() => {
    search()
  }, [search])

  const onTagSelect = (tagId: number, isSelected: boolean) => dispatch(setSearchTagSelected({ tagId, isSelected }))

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

        <TagSelector tags={questionSearchTags} onTagSelect={onTagSelect} />
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
        <button onClick={search}>검색하기</button>
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
          <QuestionList questions={questions} />
        </div>
      </div>
    </div>
  )
}
export default QuestionSearch
