// todo: refactoring
import 'css/MyPageNavigation.css'
import { useState } from 'react'
import { withRouter } from 'react-router'

enum MyPageInquireType {
  REGISTERED_QUESTION,
  REGISTERED_ANSWER,
  LIKED,
  BOOKMARKED,
}

const myPageInquires = [
  {
    title: '내가 등록한 문제',
    type: MyPageInquireType.REGISTERED_QUESTION,
    url: '/MyPage/MyRegisterQuestion',
    img: '/img/mypage_icon1.png',
  },
  {
    title: '내가 등록한 답변',
    type: MyPageInquireType.REGISTERED_ANSWER,
    url: '/MyPage/MyRegisterAnswer',
    img: '/img/mypage_icon2.png',
  },
  {
    title: '좋아요한 답변',
    type: MyPageInquireType.LIKED,
    url: '/MyPage/MyLikeAnswer',
    img: '/img/mypage_icon3.png',
  },
  {
    title: '북마크한 문제',
    type: MyPageInquireType.BOOKMARKED,
    url: '/MyPage/MyBookmarkQuestion',
    img: '/img/mypage_icon4.png',
  },
]
const MyPageNavigation = (props: any) => {
  const [focusedMyPageInquireType, setFocusedMyPageInquireType] = useState<MyPageInquireType>(
    MyPageInquireType.REGISTERED_QUESTION,
  )

  const isFocused = (type: MyPageInquireType) => {
    return focusedMyPageInquireType === type
  }

  const linkMyPageInquire = (url: string) => {
    props.history.push(url)
  }

  return (
    <div className="mypage-navigation">
      <div className="mypage-category">
        {myPageInquires.map((inquire) => {
          return (
            <button
              key={inquire.type}
              style={{
                borderBottom: isFocused(inquire.type) ? '2px solid #2188FF' : 'none',
                color: isFocused(inquire.type) ? 'black' : '#6a737d',
                fontWeight: isFocused(inquire.type) ? 'bold' : 'normal',
              }}
              onClick={() => {
                setFocusedMyPageInquireType(inquire.type)
                linkMyPageInquire(inquire.url)
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
