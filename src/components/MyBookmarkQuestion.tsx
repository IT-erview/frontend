import 'css/MyBookmarkQuestion.css'
import MyPageProfile from 'components/MyPageProfile'
import { useState } from 'react'
import QuestionList from 'components/QuestionList'
import SortSelectBox, { Sort } from './SortSelectBox'

const MyBookmarkQuestion = () => {
  const [sort, setSort] = useState<Sort>(Sort.LIKED)

  return (
    <div className="mypage-register-bookmark">
      <MyPageProfile />
      <div className="mypage-register-bookmark-question">
        <div className="mypage-register-bookmark-title">
          <span>
            <img src="/img/mypage_icon4.png" alt="mypage-register-bookmark-icon" />
            내가 북마크한 문제
          </span>
          <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
        </div>
        <QuestionList
          sort={sort === Sort.LIKED ? 'question_bookmarkCount' : 'question_createdDate'}
          type={'bookmark'}
        />
      </div>
    </div>
  )
}

export default MyBookmarkQuestion
