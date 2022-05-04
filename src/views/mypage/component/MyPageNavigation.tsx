// todo: refactoring
import { useState } from 'react'
import 'views/mypage/style/MyPageNavigation.sass'

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
    <article className={'mypage-navigation-wrap'}>
      <ul className={'mypage-navigation-list'}>
        {myPageInquires.map((inquire) => {
          return (
            <li key={inquire.type} className={`${isFocused(inquire.type) ? 'active' : ''} mypage-navigtaion-item`}>
              <button
                onClick={() => {
                  setFocusedMyPageInquireType(inquire.type)
                  props.setMypageType(inquire.type)
                }}>
                <img src={inquire.img} alt={inquire.title} />
                <span>{inquire.title}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default MyPageNavigation
