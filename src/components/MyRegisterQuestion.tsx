import 'css/MyRegisterQuestion.css'
import MyPageProfile from 'components/MyPageProfile'
import { useState, useEffect } from 'react'
import QuestionList from 'components/QuestionList'
import SortSelectBox, { Sort } from './SortSelectBox'

const MyRegisterQuestion = () => {
  const [sort, setSort] = useState<Sort>(Sort.LIKED)

  return (
    <div className="mypage-register-question">
      <MyPageProfile />
      <div className="mypage-register-question-question">
        <div className="mypage-register-question-title">
          <span>
            <img src="/img/mypage_icon1.png" alt="mypage-register-quesiton-icon" />
            내가 등록한 문제
          </span>
          <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
        </div>
        <QuestionList
          tagList={[]}
          sortBy={sort === Sort.LIKED ? 'bookmarkCount' : 'createdDate'}
          word={''}
          type={'question'}
        />
      </div>
    </div>
  )
}

export default MyRegisterQuestion
