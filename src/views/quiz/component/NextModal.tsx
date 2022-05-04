// react
import { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'
// style
import 'views/quiz/style/ExitModal.sass'
// redux
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
      <section className={'exit-modal exit-next-modal'}>
        <div className={'logo-wrap'}>
          <img className={'logo'} src="img/iterview_logo_dark.png" alt="logo" />
        </div>
        <p>답변 작성을 완료하셨나요?</p>
        <div className={'btn-wrap'}>
          <button onClick={deepQuestion} className={`btn-common btn-deep`}>
            해당 문제 심화 문제 풀기
          </button>
          <button onClick={newQuestion} className={`btn-common btn-another`}>
            다른 종류 문제 풀기
          </button>
        </div>
        <div className={'sub-btn-wrap'}>
          <button className={'btn-close'} onClick={onClickToggleNextModal}>
            답안 작성으로 돌아가기
          </button>
        </div>
      </section>
    </div>
  )
}

export default Modal
