import Navigation from 'views/common/layout/Navigation'
import Footer from 'views/common/layout/Footer'
import QuestionSearch from 'views/search/component/QuestionSearch'

const QuestionSearchPage = () => {
  const questionRegisterImg = '/img/page_info.png'
  return (
    <>
      <Navigation />
      <img id="deem" src="/img/navigation-deem.png" alt="deem" />
      <div className="question-search-img">
        <div className="question-search-info-background">
          <img src={questionRegisterImg} alt="question-register-img" />
        </div>
        <h1>면접문제 검색</h1>
        <h3>
          이리저리 흩어진 면접질문과 답변?
          <br />
          한번에 검색하고, 검증된 답변도 확인해보세요!
        </h3>
      </div>
      <div className="body">
        <QuestionSearch />
      </div>
      <Footer />
    </>
  )
}
export default QuestionSearchPage
