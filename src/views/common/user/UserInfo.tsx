import { useCallback, useEffect, useState } from 'react'
import { TagCount } from 'utils/type'
import 'views/common/user/UserInfo.sass'
import { getQuestionStat } from 'api/question'

const UserInfo = () => {
  const userName = localStorage.getItem('userName') as string
  const userImgUrl = localStorage.getItem('userImgUrl') as string
  const userEmail = localStorage.getItem('userEmail') as string
  const [tagStat, setTagStat] = useState<Array<TagCount>>([])

  const getQuestionTagStat = useCallback(async () => {
    const questionStat = await getQuestionStat()
    if (questionStat.data) {
      setTagStat(questionStat.data)
    }
  }, [setTagStat])

  const showTagStat = tagStat.map((tag, index) => {
    if (index < 3)
      return (
        <span key={index} className={'user-tag'}>
          {tag.tagTitle}
        </span>
      )
    else return null
  })

  useEffect(() => {
    getQuestionTagStat()
  }, [getQuestionTagStat])

  return (
    <>
      <div className={'user-info-box-wrap'}>
        <div className="container">
          <div className="user-info-box">
            {/* Todo: imgUrl 없다면 기본 프로필 사진으로 대체 */}
            <div className={'user-profile-wrap'}>
              <img src={userImgUrl} className={'user-image'} alt="userProfileImg" />
              <div className={'user-profile-information'}>
                <p className={'user-name'}>{userName} 님</p>
                <p className={'user-email'}>{userEmail}</p>
              </div>
            </div>
            <div className={'user-detail-wrap'}>
              {/* Todo: 실제 데이터로 교체 */}
              <div className={'user-detail-solved'}>
                <span className={'label'}>퀴즈로 푼 문제</span>
                <span className={'count'}>170</span>
              </div>
              <div className={'user-detail-like'}>
                <span className={'label'}>좋아요</span>
                <span className={'count'}>50</span>
              </div>
            </div>
            <div className={'user-tag-wrap'}>
              <p className={'user-tag-title'}>많이 푼 문제 종류</p>
              <div className={'user-tag-list-wrap'}>
                {showTagStat}
                {tagStat.length > 3 ? '...' : tagStat.length > 0 ? null : '대체 텍스트'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo
