// todo: refactoring
// react
import { ReducerType } from 'modules/rootReducer'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// util
//import { TagSelectorItem } from 'utils/type'
import { Question } from 'utils/type'
// component
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'
import QuestionList from 'views/common/question/QuestionList'
import TagSearch from 'views/common/tag/TagSearch'
// api
import { searchQuestions as searchAPI } from 'api/question'
// redux
import { setSearchResults } from 'modules/searchResults'

export const QuestionSearch = () => {
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)
  const questions = useSelector<ReducerType, Array<Question>>((state) => state.searchResults)
  const dispatch = useDispatch()

  const allQuestion = async () => {
    let params = {
      tags: [],
      sort: sort,
      size: 20,
    }
    const searchResults = await searchAPI(params)
    if (searchResults.data.content.length !== 0) {
      dispatch(setSearchResults(searchResults.data.content))
    }
  }

  useEffect(() => {
    allQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={'question-search'}>
      <div className={'question-search-box-wrap'}>
        <div className={'search-box-title-wrap'}>
          <h2>문제 검색</h2>
        </div>
        <div className={'question-search-box'}>
          <TagSearch />
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
