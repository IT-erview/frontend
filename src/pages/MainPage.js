import MainCarousel from 'components/MainCarousel'
import ClassificationTags from 'components/ClassificationTags'
import { Link } from 'react-router-dom'
import { JWT_TOKEN } from 'constants/Oauth'
import axios from 'axios'
// header 설정
axios.defaults.headers.common['Authorization'] = `Bearer ${JWT_TOKEN}`

function MainPage() {
  return (
    <div className="Main">
      <MainCarousel />
      <ClassificationTags />
      <Link to="/QuestionRegister">zz</Link>
      <br />
      <Link to="/SetQuizOptions">퀴즈풀러가기</Link>
    </div>
  )
}

export default MainPage
