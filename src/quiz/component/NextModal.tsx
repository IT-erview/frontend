import { PropsWithChildren } from 'react'
import styles from 'quiz/css/ExitAnswer.module.css'
import { useDispatch } from 'react-redux'
import { NextQuiz, setNextQuestion } from 'modules/nextQuestion'

interface ModalDefaultType {
  onClickToggleNextModal: () => void
}

function Modal({ onClickToggleNextModal }: PropsWithChildren<ModalDefaultType>) {
  const dispatch = useDispatch()
  const deepQuestion = () => {
    dispatch(setNextQuestion(NextQuiz.DEEP))
    onClickToggleNextModal()
  }
  const newQuestion = () => {
    dispatch(setNextQuestion(NextQuiz.NEW))
    onClickToggleNextModal()
  }
  return (
    <div>
      <section className={styles.exitAnswerModal}>
        <img className={styles.logo} src="img/iterview_logo_dark.png" alt="logo" />
        <h3 className={styles.text}>답변 작성을 완료하셨나요?</h3>
        <div className={styles.buttonWrap}>
          <button onClick={deepQuestion} className={`${styles.buttonBlue} ${styles.modalButton}`}>
            해당 문제 심화 문제 풀기
          </button>
          <button onClick={newQuestion} className={`${styles.buttonDarkBlue} ${styles.modalButton}`}>
            다른 종류 문제 풀기
          </button>
        </div>
        <div className={styles.buttonExitWrap}>
          <button onClick={onClickToggleNextModal}>답안 작성으로 돌아가기</button>
        </div>
      </section>
    </div>
  )
}

export default Modal
