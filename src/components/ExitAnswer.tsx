import { PropsWithChildren } from 'react'
import styles from 'css/ExitAnswer.module.css'
import { Link } from 'react-router-dom'

interface ModalDefaultType {
  onClickToggleModal: () => void
}

function NextModal({ onClickToggleModal }: PropsWithChildren<ModalDefaultType>) {
  return (
    <div>
      <section className={styles.exitAnswerModal}>
        <img className={styles.logo} src="img/iterview_logo_dark.png" alt="logo" />
        <h3 className={styles.text}>답변 작성을 완료하셨나요?</h3>
        <div className={styles.buttonWrap}>
          <button className={`${styles.buttonBlue} ${styles.modalButton}`}>해당 종류 다른 문제 풀기</button>
          <Link to="/QuizResult" className={`${styles.buttonDarkBlue} ${styles.modalButton}`}>
            다른 종류 문제 풀기
          </Link>
        </div>
        <div className={styles.buttonExitWrap}>
          <button onClick={onClickToggleModal}>답안 작성으로 돌아가기</button>
        </div>
      </section>
    </div>
  )
}

export default NextModal
