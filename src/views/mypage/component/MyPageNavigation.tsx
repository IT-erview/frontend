// todo: refactoring
import 'views/mypage/css/MyPageNavigation.css'
import { useState } from 'react'

export enum MyPageInquireType {
  REGISTERED_QUESTION,
  REGISTERED_ANSWER,
  LIKED,
  BOOKMARKED,
}

const myPageInquires = [
  {
    title: '내가 등록한 문제',
    type: MyPageInquireType.REGISTERED_QUESTION,
    img: '/img/mypage_icon1.png',
  },
  {
    title: '내가 등록한 답변',
    type: MyPageInquireType.REGISTERED_ANSWER,
    img: '/img/mypage_icon2.png',
  },
  {
    title: '좋아요한 답변',
    type: MyPageInquireType.LIKED,
    img: '/img/mypage_icon3.png',
  },
  {
    title: '북마크한 문제',
    type: MyPageInquireType.BOOKMARKED,
    img: '/img/mypage_icon4.png',
  },
]
const MyPageNavigation = (props: { mypageType: MyPageInquireType; setMypageType: Function }) => {
  const [focusedMyPageInquireType, setFocusedMyPageInquireType] = useState<MyPageInquireType>(props.mypageType)

  const isFocused = (type: MyPageInquireType) => {
    return focusedMyPageInquireType === type
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
                props.setMypageType(inquire.type)
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

export default MyPageNavigation
