import { PropsWithChildren } from 'react'
import styles from 'css/ExitAnswer.module.css'

interface ModalDefaultType {
  onClickToggleNextModal: () => void
}

function Modal({ onClickToggleNextModal, children }: PropsWithChildren<ModalDefaultType>) {
  return (
    <div>
      <section className={styles.exitAnswerModal}>
        <img className={styles.logo} src="img/iterview_logo_dark.png" alt="logo" />
        <h3>답변 작성을 완료하셨나요?</h3>
        <div className={styles.buttonWrap}>
          <button className={`${styles.buttonBlue} ${styles.modalButton}`}>해당 문제 심화 문제 풀기</button>
          <button className={`${styles.buttonDarkBlue} ${styles.modalButton}`}>다른 종류 문제 풀기</button>
        </div>
        <div className={styles.buttonExitWrap}>
          <button onClick={onClickToggleNextModal}>답안 작성을 돌아가기</button>
        </div>
      </section>
    </div>
  )
}

export default Modal
