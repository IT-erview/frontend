import { BrowserRouter, Route } from 'react-router-dom'
import MainPage from 'pages/MainPage'
import QuestionRegisterPage from 'pages/QuestionRegisterPage'
import QuestionSearchPage from 'pages/QuestionSearchPage'
import SetQuizOptionsPage from 'pages/SetQuizOptionsPage'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import MyRegisterQuestion from 'components/MyRegisterQuestion'
import MyBookmarkQuestion from 'components/MyBookmarkQuestion'
import QuizResult from 'pages/QuizResult'
import AnswerRegisterPage from 'pages/AnswerRegisterPage'
import QuestionDetailPage from 'pages/QuestionDetailPage'
import PublicRoute from 'Routes/PublicRoute'
import PrivateRoute from 'Routes/PrivateRoute'
import LoginPage from 'components/LoginPage'
import MyAnswers, { MyAnswerType } from 'components/MyAnswers'

const Routers = () => (
  <BrowserRouter>
    <PublicRoute exact path="/" component={MainPage} />
    <PublicRoute exact path="/LoginPage" component={MainPage} />
    <PublicRoute exact path="/LoginPage" component={LoginPage} />

    <PrivateRoute exact path="/login" component={MainPage} />
    <Route path="/MyPage" component={Navigation} />
    <PrivateRoute exact path="/MyPage/MyRegisterQuestion" component={MyRegisterQuestion} />
    <PrivateRoute exact path="/MyPage/MyRegisterAnswer" component={() => MyAnswers({ type: MyAnswerType.ALL })} />
    <PrivateRoute exact path="/MyPage/MyLikeAnswer" component={() => MyAnswers({ type: MyAnswerType.LIKED })} />
    <PrivateRoute exact path="/MyPage/MyBookmarkQuestion" component={MyBookmarkQuestion} />
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
