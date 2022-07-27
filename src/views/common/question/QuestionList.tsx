import { Question } from 'utils/type'
// import 'views/common/layout/Navigation.css'
import QuestionComponent from 'views/common/question/Question'
// library
// react
// redux
// component
//api

const QuestionList = (props: { questions: Array<Question> }) => {
  // const totalElements = useSelector<ReducerType, number>((state) => state.searchTotalElement)
  // const totalPage = Math.trunc((totalElements - 1) / 10)
  // const [currentPage, setCurrentPage] = useState(0)
  // const [hasMore, setHasMore] = useState(true)
  // if (totalPage === 0) {
  //   setHasMore(false)
  // }

  // const searchTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.searchTags)
  // const selectedTagsId = searchTags.filter((tag) => tag.isSelected === true).map((tag) => tag.id)
  // const sort = useSelector<ReducerType, Sort>((state) => state.currentSort)
  // const searchKeywords = useSelector<ReducerType, string>((state) => state.searchKeywords)

  // const nextQuestion = async () => {
  //   let params = {
  //     keyword: searchKeywords,
  //     tags: selectedTagsId.toString(),
  //     sort: sort,
  //     size: 10,
  //     page: currentPage,
  //   }
  //   const searchResults = await searchAPI(params)
  //   console.log('결과', searchResults)
  // }

  // useEffect(() => {
  //   if (currentPage < totalPage) {
  //     console.log('더 있어')
  //     setHasMore(true)
  //     setCurrentPage((cur) => cur + 1)
  //     console.log('현재 페이지', currentPage)
  //   } else {
  //     console.log('없어')
  //     setHasMore(false)
  //     return
  //   }
  // }, [currentPage, totalPage])

  return (
    <div className={'question-list-wrap'}>
      {(props.questions.length > 0 &&
        props.questions.map((question, index) => (
          <QuestionComponent
            key={question.id}
            id={question.id}
            number={index + 1}
            content={question.content}
            tagList={question.tagList}
            answer={question.mostLikedAnswer?.content}
            bookmark={question.bookmark}
            bookmarkCount={question.bookmarkCount}
          />
        ))) || <p className={'list-none'}>등록된 문제가 없습니다.</p>}
    </div>
  )
}
export default QuestionList
