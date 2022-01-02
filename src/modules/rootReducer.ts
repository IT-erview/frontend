import { combineReducers } from 'redux'
import registerTags from 'modules/registerTags'
import searchTags from 'modules/searchTags'
import quizTags from 'modules/quizTags'
import allTags from 'modules/allTags'
import loginModal from 'modules/loginModal'
import resetQuiz from 'modules/resetQuiz'

const reducer = combineReducers({
  registerTags,
  searchTags,
  quizTags,
  loginModal,
  allTags,
  resetQuiz,
})

export type ReducerType = ReturnType<typeof reducer>
export default reducer
