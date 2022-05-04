// style
import 'views/search/style/QuestionSearch.sass'
// component
import Navigation from 'views/common/layout/Navigation'
import Footer from 'views/common/layout/Footer'
import QuestionSearch from 'views/search/component/QuestionSearch'

const QuestionSearchPage = () => {
  const questionSearchImg = '/img/quiz_img.png'
  return (
    <>
      <Navigation />
      <main className={'question-search-wrap'}>
        <section className={'banner-wrap'} style={{ backgroundImage: `url(${questionSearchImg})` }}>
          <div className={'container'}>
            <h1>면접문제 검색</h1>
            <p>
              이리저리 흩어진 면접질문과 답변?
              <br />
              한번에 검색하고, 검증된 답변도 확인해보세요!
            </p>
            <div className={'question-search-tip-wrap'}>
              <div className={'question-search-tip-box'}>
                알고싶은
                <br />
                문제종류와 키워드를
                <br />
                검색하세요!
              </div>
            </div>
          </div>
        </section>
        <section className={'content-wrap'}>
          <div className={'container'}>
            <QuestionSearch />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
export default QuestionSearchPage
