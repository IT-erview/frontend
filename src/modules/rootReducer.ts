import { combineReducers } from 'redux'
import registerTags from 'modules/registerTags'
import search from 'modules/search'
import quizTags from 'modules/quizTags'
import allTags from 'modules/allTags'
import loginModal from 'modules/loginModal'
import resetQuiz from 'modules/resetQuiz'
import quizQuestions from 'modules/quizQuestions'
import nextQuestion from 'modules/nextQuestion'

const reducer = combineReducers({
  registerTags,
  search,
  quizTags,
  loginModal,
  allTags,
  resetQuiz,
  quizQuestions,
  nextQuestion,
})

export type ReducerType = ReturnType<typeof reducer>
export default reducer
