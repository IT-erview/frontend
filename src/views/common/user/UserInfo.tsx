import { useCallback, useEffect, useState } from 'react'
import { TagCount } from 'utils/type'
import styles from 'views/quiz/css/Quiz.module.css'
import { getQuestionStat } from 'api/question'

const UserInfo = () => {
  const userName = localStorage.getItem('userName') as string
  const userImgUrl = localStorage.getItem('userImgUrl') as string
  const userEmail = localStorage.getItem('userEmail') as string
  const [tagStat, setTagStat] = useState<Array<TagCount>>([])

  const getQuestionTagStat = useCallback(async () => {
    const questionStat = await getQuestionStat()
    if (questionStat) {
      setTagStat(questionStat)
    }
  }, [setTagStat])

  const showTagStat = tagStat.map((tag, index) => {
    if (index < 3)
      return (
        <div key={index} className={styles.userTag}>
          {tag.tagTitle}
        </div>
      )
    else return null
  })

  useEffect(() => {
    getQuestionTagStat()
  }, [getQuestionTagStat])

  return (
    <>
      <div className={styles.userInfo}>
        {/* Todo: imgUrl 없다면 기본 프로필 사진으로 대체 */}
        <div className={styles.userProfileSection}>
          <img src={userImgUrl} alt="userProfileImg" className={styles.userProfileImg}></img>
          <div>
            <p className={styles.userName}>{userName} 님</p>
            <p className={styles.userEmail}>{userEmail}</p>
          </div>
        </div>
        <div className={styles.verticalLine} />
        <div className={styles.userDetailSection}>
          {/* Todo: 실제 데이터로 교체 */}
          <div className={styles.userDetailTitle}>
            <p>퀴즈로 푼 문제</p>
            <p>좋아요</p>
          </div>
          <div className={styles.userDetailCnt}>
            <p>170</p>
            <p>50</p>
          </div>
        </div>
        <div className={styles.verticalLine} />
        <div className={styles.userTagsSection}>
          <p className={styles.userTagsTitle}>많이 푼 문제 종류</p>
          <div className={styles.userTags}>
            {showTagStat}
            {tagStat.length > 3 ? '...' : tagStat.length > 0 ? null : '대체 텍스트'}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfo
