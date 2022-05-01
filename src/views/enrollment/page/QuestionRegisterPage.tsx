// todo: refactoring
import Footer from 'views/common/layout/Footer'
import Navigation from 'views/common/layout/Navigation'
import QuestionRegister from 'views/enrollment/component/QuestionRegister'
// style
import 'views/enrollment/css/QuestionRegister.sass'

const QuestionRegisterPage = () => {
  const questionRegisterImg = '/img/quiz_img.png'
  return (
    <>
      <Navigation />
      <main className={'question-register-wrap'}>
        <section className={'banner-wrap'} style={{ backgroundImage: `url(${questionRegisterImg})` }}>
          <div className={'container'}>
            <h1>면접문제 등록</h1>
            <p>
              답변을 확인하고 싶은 문제가 있으신가요?
              <br />
              직접 문제를 등록하고 내 답변을 비교해보세요!
            </p>
            <div className="question-register-tip">
              알고싶은
              <br />
              문제를 작성해주세요!
            </div>
          </div>
        </section>
        <section className="content-wrap">
          <div className="container">
            <QuestionRegister />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
export default QuestionRegisterPage
