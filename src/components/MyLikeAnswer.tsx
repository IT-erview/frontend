import 'css/MyLikeAnswer.css'
import MyPageProfile from 'components/MyPageProfile'
import { useState, useEffect } from 'react'
import InfiniteAnswerList from 'components/InfiniteAnswerList'
import SortSelectBox, { Sort } from './SortSelectBox'

const MyLikeAnswer = () => {
  const [sort, setSort] = useState<Sort>(Sort.LIKED)

  return (
    <div className="mypage-register-like">
      <MyPageProfile />
      <div className="mypage-register-like-question">
        <div className="mypage-register-question-title">
          <span>
            <img src="/img/mypage_icon3.png" />
            내가 좋아요한 답변
          </span>
          <SortSelectBox defaultSort={sort} onSortChanged={(sort) => setSort(sort)} />
        </div>
        <InfiniteAnswerList
          question={-1}
          title=""
          // todo: 추후 sort로만 가야함. API 변경 필요
          sortBy={sort === Sort.LIKED ? 'answerManager_liked' : 'answerManager_CreatedDate'}
          type="mylike"
        />
      </div>
    </div>
  )
}

export default MyLikeAnswer
