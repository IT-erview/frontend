// todo: refactoring
// react
import { useState } from 'react'
import { Question } from 'utils/type'
// util
// redux
// api
// component
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'
import QuestionList from 'views/common/question/QuestionList'
import TagSearch from 'views/common/tag/TagSearch'

const QuestionSearch = () => {
  // const dispatch = useDispatch()
  // const [questionSearchInput, setQuestionSearchInput] = useState<string>('')

  // const questionSearchTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.searchTags)
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)
  // const [questions, setQuestions] = useState<Array<Question>>([])
  const questions = [] as Array<Question>

  // const search = useCallback(async () => {
  //   let params = {
  //     keyword: questionSearchInput,
  //     page: 0,
  //     size: 30,
  //     tags: tagList.toString(),
  //     sort: `${sort},desc`,
  //   }
  //   const searchResults = await searchQuestions(params)
  //   setQuestions(searchResults.data)
  //   setQuestionSearchInput('')
  // }, [questionSearchInput, sort, tagList])

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
