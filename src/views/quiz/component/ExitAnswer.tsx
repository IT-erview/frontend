// react
import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
// style
import 'views/quiz/css/ExitModal.sass'

interface ModalDefaultType {
  onClickToggleModal: () => void
}

function NextModal({ onClickToggleModal }: PropsWithChildren<ModalDefaultType>) {
  return (
    <div>
      <section className={'exit-modal exit-answer-modal'}>
        <div className={'logo-wrap'}>
          <img className={'logo'} src="img/iterview_logo_dark.png" alt="logo" />
        </div>
        <p>답변 작성을 완료하셨나요?</p>
        <div className={'btn-wrap'}>
          <Link to="/QuizResult" className={`btn-exit btn-common`}>
            퀴즈 종료하기
          </Link>
        </div>
        <div className={'sub-btn-wrap'}>
          <button className={'btn-close'} onClick={onClickToggleModal}>
            답안 작성으로 돌아가기
          </button>
        </div>
      </section>
    </div>
  )
}

export default NextModal
