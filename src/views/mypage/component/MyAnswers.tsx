// react
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// library
import InfiniteScroll from 'react-infinite-scroll-component'
// util
import { Answer, TagSelectorItem } from 'utils/type'
// style
import 'views/mypage/css/MyAnswer.sass'
import 'views/mypage/css/MypageFilter.sass'
// redux
import { ReducerType } from 'modules/rootReducer'
import { setQuizTagSelected } from 'modules/quizTags'
// api
import { getMyAnswers, getMyLikedAnswers } from 'test/api/answer'
// component
import SortSelectBox, { Sort } from 'views/common/form/SortSelectBox'
import AnswerComponent from 'views/common/answer/Answer'

export enum MyAnswerType {
  ALL,
  LIKED,
}

const MyAnswers = (props: { type: MyAnswerType }) => {
  const ROWS_PER_PAGE = 4
  const INITIAL_PAGE = 0
  const [sort, setSort] = useState<Sort>(Sort.POPULAR)
  const [page, setPage] = useState(INITIAL_PAGE)
  const [hasMore, setHasMore] = useState(true)
  const [answers, setAnswers] = useState<Array<Answer>>([])

  const tagToggle = () => setFilterDropdownOpen((prevState) => !prevState)
  const quizTags = useSelector<ReducerType, Array<TagSelectorItem>>((state) => state.quizTags)
  const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false)

  const dispatch = useDispatch()
  const selectTag = (tagId: number, isSelected: boolean) => {
    dispatch(setQuizTagSelected({ tagId, isSelected: !isSelected }))
  }

  const getAnswers = async (type: MyAnswerType, sort: string, page: number) => {
    // let params = {
    //   page: page,
    //   size: ROWS_PER_PAGE,
    //   sort: `${sort},desc`,
    // }
    if (type === MyAnswerType.ALL) return await getMyAnswers(sort, page, ROWS_PER_PAGE)
    return await getMyLikedAnswers(sort, page, ROWS_PER_PAGE)
  }

  const fetchAnswers = async () => {
    if (!hasMore) return
    const nextPage = page + 1
    const fetchedAnswer = await getAnswers(props.type, sort, nextPage)
    setPage(nextPage)
    setAnswers((answers) => [...answers, ...fetchedAnswer])
  }

  useEffect(() => {
    const refreshAnswers = async () => {
      const fetchedAnswer = await getAnswers(props.type, sort, INITIAL_PAGE)
      setHasMore(fetchedAnswer.length > 0)
      setAnswers(fetchedAnswer)
      setPage(INITIAL_PAGE)
    }
    refreshAnswers()
  }, [sort, props.type])

  const dropDownSort = (
    <div className="dropdown-common dropdown-sort-wrap">
      <div className={'checkbox-wrap'}>
        <input type="checkbox" id="popular" name="sort" />
        <label htmlFor="popular">인기순</label>
      </div>
      <div className={'checkbox-wrap'}>
        <input type="checkbox" id="latest" name="sort" />
        <label htmlFor="latest">최신순</label>
      </div>
      <div className={'checkbox-wrap'}>
        <input type="checkbox" id="older" name="sort" />
        <label htmlFor="older">오래된 순</label>
      </div>
    </div>
  )

  const dropdownTag = quizTags.map((tag: TagSelectorItem) => (
    <div className={'checkbox-wrap'} key={tag.id}>
      <input
        className={`${tag.isSelected ? 'selected' : ''} input-option`}
        type="checkbox"
        id={tag.name}
        name={tag.name}
        onChange={() => selectTag(tag.id, tag.isSelected)}
      />
      <label htmlFor={tag.name}>{tag.name}</label>
    </div>
  ))

  return (
    <div className="mypage-answer-wrap">
      <div className={'mypage-filter-wrap'}>
        <div className={'mypage-filter-compact'}>
          <span className={'compact-title'}>필터 설정하기</span>
          <div className={'compact-handler'}>
            <button className={'btn-dropdown-reset'}>필터 초기화 X</button>
            <button className={'btn-dropdown'} onClick={tagToggle}>
              <img
                src="img/dropdown_white.png"
                alt="dropdownArrow"
                className={`${filterDropdownOpen ? 'active' : ''} icon-dropdown`}
              />
            </button>
          </div>
        </div>
        <div className={`${filterDropdownOpen ? 'show' : ''} dropdown-box`}>
          {filterDropdownOpen ? dropDownSort : null}
          <div className="dropdown-common dropdown-tag-wrap">{filterDropdownOpen ? dropdownTag : null}</div>
        </div>
      </div>
      <InfiniteScroll
        style={{ overflow: 'inherit' }}
        dataLength={answers.length}
        next={fetchAnswers}
        hasMore={hasMore}
        loader={<></>}>
        {answers.map((answer, index) => {
          console.log(answer.questionId)
          return (
            <AnswerComponent
              key={answer.id}
              id={answer.questionId}
              number={index + 1}
              content={answer.questionContent || ''}
              answer={answer.content}
              tagList={answer.tags}
              like={answer.like}
              likeCount={answer.liked}
            />
          )
        })}
        <p className={'none-list'}>{answers.length === 0 && '등록된 답변이 없습니다.'}</p>
      </InfiniteScroll>
      <div className="mypage-register-question-title">
        <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
      </div>
    </div>
  )
}

export default MyAnswers
