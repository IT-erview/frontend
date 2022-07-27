// todo: refactoring
// react
import { ReducerType } from 'modules/rootReducer'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// util
import { Question, TagSelectorItem } from 'utils/type'
// component
import QuestionList from 'views/common/question/QuestionList'
import TagSearch from 'views/common/tag/TagSearch'
// api
import { searchQuestions as searchAPI } from 'api/question'
// redux
import SortSelectBox, { Sort } from '../../common/form/SortSelectBox'
import { setSearch } from '../../../modules/search'

export const QuestionSearch = () => {
  const [questions, setQuestions] = useState<Array<Question>>([])
  const searchTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.search.tags)
  const tags: string = searchTags
    .filter((tag) => tag.isSelected)
    .map((tag) => tag.id)
    .toString()
  const searchKeywords = useSelector<ReducerType, string>((state) => state.search.keyword)
  const dispatch = useDispatch()
  const doSearch = useSelector<ReducerType, boolean>((state) => state.search.search)
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)

  const getQuestion = useCallback(async () => {
    let params = {
      keyword: searchKeywords,
      tags: tags,
      sort: sort,
      size: 20,
      page: 0,
    }
    const searchResults = await searchAPI(params)
    if (searchResults.data.content) {
      setQuestions(searchResults.data.content)
    }
  }, [searchKeywords, tags, sort])

  useEffect(() => {
    if (doSearch) {
      getQuestion()
      dispatch(setSearch(false))
    } else if (!questions.length && !tags.length && !searchKeywords.length) getQuestion()
  }, [doSearch, dispatch, getQuestion])

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
            <SortSelectBox
              defaultSort={sort}
              onSortChanged={(sort) => {
                setSort(sort)
                dispatch(setSearch(true))
              }}
            />
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
