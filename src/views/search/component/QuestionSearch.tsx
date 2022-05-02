// todo: refactoring
// react
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'reactstrap'
// util
import { Question, TagSelectorItem } from 'utils/type'
import { MAX_SEARCH_WORD_LENGTH } from 'utils/config'
// redux
import { setSearchTagSelected } from 'modules/searchTags'
// api
import { searchQuestions } from 'api/question'
// component
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'
import { ReducerType } from 'modules/rootReducer'
import TagSelector from 'views/common/tag/TagSelector'
import QuestionList from 'views/common/question/QuestionList'

const QuestionSearch = () => {
  const dispatch = useDispatch()
  const [questionSearchInput, setQuestionSearchInput] = useState<string>('')

  const questionSearchTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.searchTags)
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)
  const [questions, setQuestions] = useState<Array<Question>>([])

  const tagList = questionSearchTags.filter((tag) => tag.isSelected).map((tag) => tag.id)

  const search = useCallback(async () => {
    let params = {
      keyword: questionSearchInput,
      page: 0,
      size: 30,
      tags: tagList.toString(),
      sort: `${sort},desc`,
    }
    const searchResults = await searchQuestions(params)
    setQuestions(searchResults.data)
    setQuestionSearchInput('')
  }, [questionSearchInput, questionSearchTags, sort])

  useEffect(() => {
    search()
  }, [search])

  const onTagSelect = (tagId: number, isSelected: boolean) => dispatch(setSearchTagSelected({ tagId, isSelected }))

  return (
    <div className={'question-search'}>
      <div className={'question-search-box-wrap'}>
        <div className={'search-box-title-wrap'}>
          <h2>문제 검색</h2>
        </div>
        <div className={'question-search-box'}>
          <div className={'question-search-input-wrap'}>
            <Input
              id="question-search-input"
              className={'question-search-input'}
              type="text"
              value={questionSearchInput}
              maxLength={MAX_SEARCH_WORD_LENGTH}
              onChange={(e) => {
                setQuestionSearchInput(e.target.value)
              }}
              placeholder="관련어를 검색해주세요"
            />
            <button className={'btn-search'} onClick={search}>
              검색하기
            </button>
          </div>
          <p className={'search-information'}>
            일일이 찾아야 했던 면접 질문과 답변들, 검증되지 않았던 정보들, 한 번에 검색하고 검증된 정보를 받아보세요.
          </p>
          <div className={'search-tag-wrap'}>
            <TagSelector tags={questionSearchTags} onTagSelect={onTagSelect} />
          </div>
        </div>
      </div>
      <div className={'searched-question-wrap'}>
        <div className={'searched-title-wrap'}>
          <h2>등록된 면접 문제</h2>
          <div className={'sort-button-wrap'}>
            <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
          </div>
        </div>
        <div className={'searched-content-wrap'}>
          <QuestionList questions={questions} />
        </div>
      </div>
    </div>
  )
}
export default QuestionSearch
