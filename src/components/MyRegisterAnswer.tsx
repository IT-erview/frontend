import 'css/MyRegisterAnswer.css'
import MyPageProfile from 'components/MyPageProfile'
import { useState, useEffect } from 'react'
import InfiniteAnswerList from 'components/InfiniteAnswerList'
import SortSelectBox, { Sort } from './SortSelectBox'

const MyRegisterAnswer = () => {
  const [sort, setSort] = useState<Sort>(Sort.LIKED)

  return (
    <div className="mypage-register-answer">
      <MyPageProfile />
      <div className="mypage-register-answer-question">
        <div className="mypage-register-answer-title">
          <span>
            <img src="/img/mypage_icon2.png" alt="mypage-register-answer-icon" />
            내가 등록한 답변
          </span>
          <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
        </div>
        <InfiniteAnswerList question={-1} title="" sortBy={sort} type="myanswer" />
      </div>
    </div>
  )
}

export default MyRegisterAnswer
