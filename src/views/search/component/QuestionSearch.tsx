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
//
import 'views/search/style/QuestionSearch.sass'
import Pagination from 'react-js-pagination'

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
  const [totalElement, setTotalElement] = useState(0)
  const [page, setPage] = useState(1)

  const getQuestion = useCallback(async () => {
    let params = {
      keyword: searchKeywords,
      tags: tags,
      sort: sort,
      size: 5,
      page: page - 1,
    }
    const searchResults = await searchAPI(params)
    if (searchResults.data.content) {
      setTotalElement(searchResults.data.totalElements)
      setQuestions(searchResults.data.content)
    }
  }, [searchKeywords, tags, sort, page])

  const SearchPaging = () => {
    function handlePageChange(page: number) {
      setPage(page)
      dispatch(setSearch(true))
    }
    return (
      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={totalElement}
        pageRangeDisplayed={5}
        prevPageText="<"
        nextPageText=">"
        onChange={handlePageChange}
      />
    )
  }

  useEffect(() => {
    if (doSearch) {
      //setPage(1)
      getQuestion()
      dispatch(setSearch(false))
    } else if (!questions.length && !tags.length && !searchKeywords.length) getQuestion()
  }, [doSearch, dispatch, getQuestion, questions, tags, searchKeywords, page])

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
          <h2>등록된 면접 문제 ({totalElement})</h2>
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
          <QuestionList questions={questions} page={page} />
        </div>
        <div className={'paging-wrap'}>
          <SearchPaging />
        </div>
      </div>
    </div>
  )
}
export default QuestionSearch
