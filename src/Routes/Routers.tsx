import { BrowserRouter, Route } from 'react-router-dom'
import MainPage from 'main/page/MainPage'
import QuestionRegisterPage from 'enrollment/page/QuestionRegisterPage'
import QuestionSearchPage from 'search/page/QuestionSearchPage'
import SetQuizOptionsPage from 'quiz/page/SetQuizOptionsPage'
import Navigation from 'common/layout/Navigation'
import Footer from 'common/layout/Footer'
import QuizResult from 'quiz/page/QuizResult'
import AnswerRegisterPage from 'quiz/page/AnswerRegisterPage'
import QuestionDetailPage from 'quiz/page/QuestionDetailPage'
import PublicRoute from 'Routes/PublicRoute'
import PrivateRoute from 'Routes/PrivateRoute'
import LoginPage from 'common/login/LoginPage'
import MyPage from 'mypage/page/MyPage'

const Routers = () => (
  <BrowserRouter>
    <PublicRoute exact path="/" component={MainPage} />
    <PublicRoute exact path="/LoginPage" component={MainPage} />
    <PublicRoute exact path="/LoginPage" component={LoginPage} />

    <PrivateRoute exact path="/login" component={MainPage} />
    <Route path="/MyPage" component={Navigation} />
    <PrivateRoute path="/Mypage" component={MyPage} />
    {/* <PrivateRoute exact path="/MyPage/MyRegisterQuestion" component={MyRegisterQuestion} />
    <PrivateRoute exact path="/MyPage/MyRegisterAnswer" component={() => MyAnswers({ type: MyAnswerType.ALL })} />
    <PrivateRoute exact path="/MyPage/MyLikeAnswer" component={() => MyAnswers({ type: MyAnswerType.LIKED })} />
    <PrivateRoute exact path="/MyPage/MyBookmarkQuestion" component={MyBookmarkQuestion} /> */}
    <PrivateRoute exact path="/QuestionRegister" component={QuestionRegisterPage} />
    <PrivateRoute exact path="/QuestionSearch" component={QuestionSearchPage} />
    <PrivateRoute path="/QuestionDetail" component={QuestionDetailPage} />
    <PrivateRoute exact path="/SetQuizOptions" component={SetQuizOptionsPage} />
    <PrivateRoute exact path="/AnswerRegister" component={AnswerRegisterPage} />
    <PrivateRoute exact path="/QuizResult" component={QuizResult} />
    <PrivateRoute path="/MyPage" component={Footer} />
  </BrowserRouter>
)

export default Routers
