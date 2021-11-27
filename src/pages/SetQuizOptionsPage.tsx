// todo: refactoring
import SetQuizOptions from 'components/SetQuizOptions'
import axios from 'axios'
import { JWT_TOKEN } from 'constants/Oauth'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import styles from 'css/Quiz.module.css'

axios.defaults.headers.common['Authorization'] = `Bearer ${JWT_TOKEN}`

const SetQuizOptionsPage = () => {
  const setQuizOptionsImg = '/img/quiz_img.png'
  return (
    <>
      <Navigation />
      {/* <img id="deem" src="/img/navigation-deem.png" alt="deem" className={styles.banner} /> */}
      <div className={styles.banner}>
        {/* <div className="question-search-info-background"> */}
        <img src={setQuizOptionsImg} alt="question_banner_img" className={styles.bannerImg} />
        {/* </div> */}
        <p className={styles.bannerTitle}>면접문제 학습</p>
        <p className={styles.bannerContent}>
          아직도 암기식으로 면접을 준비하시나요?
          <br />
          체계적으로 전략적으로 학습해보세요!
        </p>
      </div>
      <div className="body">
        <SetQuizOptions />
      </div>
      <Footer />
    </>
  )
}
export default SetQuizOptionsPage
