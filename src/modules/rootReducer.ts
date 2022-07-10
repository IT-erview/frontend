import { combineReducers } from 'redux'
import registerTags from 'modules/registerTags'
import searchTags from 'modules/searchTags'
import quizTags from 'modules/quizTags'
import allTags from 'modules/allTags'
import loginModal from 'modules/loginModal'
import resetQuiz from 'modules/resetQuiz'
import quizQuestions from 'modules/quizQuestions'
import nextQuestion from 'modules/nextQuestion'
import searchKeywords from 'modules/searchKeywords'
import currentSort from 'modules/currentSort'
import searchResults from 'modules/searchResults'
import searchTotalElement from 'modules/searchTotalElement'

const reducer = combineReducers({
  registerTags,
  searchTags,
  quizTags,
  loginModal,
  allTags,
  resetQuiz,
  quizQuestions,
  nextQuestion,
  searchKeywords,
  currentSort,
  searchResults,
  searchTotalElement,
})

export type ReducerType = ReturnType<typeof reducer>
export default reducer
