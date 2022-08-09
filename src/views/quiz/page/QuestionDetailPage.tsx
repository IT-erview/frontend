import Navigation from 'views/common/layout/Navigation'
import Footer from 'views/common/layout/Footer'
// import { useEffect, useState } from 'react'
// import { isNumeric } from 'utils/util'
// import { getQuestion } from 'api/question'
import 'views/quiz/style/QuestionDetailStyle.sass'

import QuestionDetail from 'views/quiz/component/QuestionDetail'

// const getParsedParameters = () => {
//   const questionIdParameters = new URLSearchParams(window.location.search).get('question_id')
//   return {
//     questionId: isNumeric(questionIdParameters) ? Number(questionIdParameters) : undefined,
//   }
// }

const QuestionDetailPage = () => {
  const questionRegisterImg = '/img/quiz_img.png'
  // const questionId = getParsedParameters().questionId
  // const [questionContent, setQuestionContent] = useState<string>('')
  // useEffect(() => {
  //   const getQuestionContent = async () => {
  //     if (questionId) {
  //       const question = await getQuestion(questionId)
  //       console.log(question)
  //       if (question.data) setQuestionContent(question.data.content)
  //     }
  //   }
  //   getQuestionContent()
  // }, [questionId])
  return (
    <>
      <Navigation />
      <main className="question-detail-wrap">
        <section className="banner-wrap" style={{ backgroundImage: `url(${questionRegisterImg})` }}>
          <div className="container">
            <h1>제목</h1>
            <p>
              이리저리 흩어진 면접지문과 답변?
              <br />
              한번에 검색하고 검증된 답변도 확인해보세요!
            </p>
          </div>
        </section>
        <QuestionDetail />
      </main>
      <Footer />
    </>
  )
}

export default QuestionDetailPage
