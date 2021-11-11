import { combineReducers } from 'redux'
import registerTags from 'modules/registerTags'
import searchTags from 'modules/searchTags'
import quizTags from 'modules/quizTags'
import loginModal from 'modules/loginModal'

const reducer = combineReducers({
  registerTags,
  searchTags,
  quizTags,
  loginModal,
})

export type ReducerType = ReturnType<typeof reducer>
export default reducer
