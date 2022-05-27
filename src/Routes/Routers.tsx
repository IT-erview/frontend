import { BrowserRouter, Route } from 'react-router-dom'
import MainPage from 'views/main/page/MainPage'
import QuestionRegisterPage from 'views/enrollment/page/QuestionRegisterPage'
import QuestionSearchPage from 'views/search/page/QuestionSearchPage'
import SetQuizOptionsPage from 'views/quiz/page/SetQuizOptionsPage'
import Navigation from 'views/common/layout/Navigation'
import Footer from 'views/common/layout/Footer'
import QuizResult from 'views/quiz/page/QuizResult'
import AnswerRegisterPage from 'views/quiz/page/AnswerRegisterPage'
import QuestionDetailPage from 'views/quiz/page/QuestionDetailPage'
import PublicRoute from 'Routes/PublicRoute'
import PrivateRoute from 'Routes/PrivateRoute'
import LoginPage from 'views/common/login/LoginPage'
import MyPage from 'views/mypage/page/MyPage'

const Routers = () => (
  <BrowserRouter>
    <PublicRoute exact path="/" component={MainPage} />
    <PublicRoute exact path="/LoginPage" component={MainPage} />
    <PublicRoute exact path="/LoginPage" component={LoginPage} />

    <PrivateRoute exact path="/login" component={MainPage} />
    <Route path="/MyPage" component={Navigation} />
    <PrivateRoute path="/Mypage" component={MyPage} />
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
