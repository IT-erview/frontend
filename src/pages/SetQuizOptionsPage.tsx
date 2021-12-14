// todo: refactoring
import SetQuizOptions from 'components/SetQuizOptions'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import styles from 'css/Quiz.module.css'

const SetQuizOptionsPage = () => {
  const setQuizOptionsImg = '/img/quiz_img.png'
  return (
    <>
      <Navigation />
      <div className={styles.banner}>
        <img src={setQuizOptionsImg} alt="question_banner_img" className={styles.bannerImg} />
        <p className={styles.bannerTitle}>면접문제 학습</p>
        <p className={styles.bannerContent}>
          아직도 암기식으로 면접을 준비하시나요?
          <br />
          체계적으로 전략적으로 학습해보세요!
        </p>
        <div className={styles.bannerInfo}>
          <p className={styles.bannerInfoText}>
            풀고 싶은
            <br /> 문제 종류와 개수를
            <br /> 선택해주세요!
          </p>
        </div>
      </div>
      <div className="body">
        <SetQuizOptions />
      </div>
      <Footer />
    </>
  )
}
export default SetQuizOptionsPage
