// todo: refactoring
import 'css/MyPageNavigation.css'
import { useState } from 'react'
import { withRouter } from 'react-router'

enum MypageInquireType {
  REGISTERED_QUESTION,
  REGISTERED_ANSWER,
  LIKED,
  BOOKMARKED,
}

const mypageInquires = [
  {
    title: '내가 등록한 문제',
    type: MypageInquireType.REGISTERED_QUESTION,
    url: '/MyPage/MyRegisterQuestion',
    img: '/img/mypage_icon1.png',
  },
  {
    title: '내가 등록한 답변',
    type: MypageInquireType.REGISTERED_ANSWER,
    url: '/MyPage/MyRegisterAnswer',
    img: '/img/mypage_icon2.png',
  },
  {
    title: '좋아요한 답변',
    type: MypageInquireType.LIKED,
    url: '/MyPage/MyLikeAnswer',
    img: '/img/mypage_icon3.png',
  },
  {
    title: '북마크한 문제',
    type: MypageInquireType.BOOKMARKED,
    url: '/MyPage/MyBookmarkQuestion',
    img: '/img/mypage_icon4.png',
  },
]
const MyPageNavigation = (props: any) => {
  const [focusedMypageInquireType, setFocuesdMypageInquireType] = useState<MypageInquireType>(
    MypageInquireType.REGISTERED_QUESTION,
  )

  const isFocused = (type: MypageInquireType) => {
    return focusedMypageInquireType === type
  }

  const linkMypageInquire = (url: string) => {
    props.history.push(url)
  }

  return (
    <div className="mypage-navigation">
      <div className="mypage-category">
        {mypageInquires.map((inquire) => {
          return (
            <button
              key={inquire.type}
              style={{
                borderBottom: isFocused(inquire.type) ? '2px solid #2188FF' : 'none',
                color: isFocused(inquire.type) ? 'black' : '#6a737d',
                fontWeight: isFocused(inquire.type) ? 'bold' : 'normal',
              }}
              onClick={() => {
                setFocuesdMypageInquireType(inquire.type)
                linkMypageInquire(inquire.url)
              }}>
              <img src={inquire.img} alt={inquire.title} />
              <span id="text-question">{inquire.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default withRouter(MyPageNavigation)
