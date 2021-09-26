import 'css/MyRegisterAnswer.css'
import MyPageProfile from 'components/MyPageProfile'
import { useState, useEffect } from 'react'
import InfiniteAnswerList from 'components/InfiniteAnswerList'

const MyRegisterAnswer = () => {
  const [sort, setSort] = useState('popular')

  useEffect(() => {
    const likeBtn = document.getElementById('sort-by-popular')
    const latestBtn = document.getElementById('sort-by-latest')

    if (sort === 'popular') {
      likeBtn.style.color = '#4d4d4e'
      likeBtn.style.borderColor = '#707070'
      likeBtn.style.fontWeight = 'bold'

      latestBtn.style.color = '#6a737d'
      latestBtn.style.borderColor = '#cdcdd5'
      latestBtn.style.fontWeight = 'normal'
    } else {
      likeBtn.style.color = '#6a737d'
      likeBtn.style.borderColor = '#cdcdd5'
      likeBtn.style.fontWeight = 'normal'

      latestBtn.style.color = '#4d4d4e'
      latestBtn.style.borderColor = '#707070'
      latestBtn.style.fontWeight = 'bold'
    }
  }, [sort])

  return (
    <div className="mypage-register-answer">
      <MyPageProfile />
      <div className="mypage-register-answer-question">
        <div className="mypage-register-answer-title">
          <span>
            <img src="/img/mypage_icon2.png" alt="mypage-register-answer-icon" />
            내가 등록한 답변
          </span>
          <button
            id="sort-by-latest"
            onClick={() => {
              setSort('latest')
            }}>
            최신순
          </button>
          <button
            id="sort-by-popular"
            onClick={() => {
              setSort('popular')
            }}>
            인기순
          </button>
        </div>
        <InfiniteAnswerList question={-1} title="" sortBy={sort} type="myanswer" />
      </div>
    </div>
  )
}

export default MyRegisterAnswer
