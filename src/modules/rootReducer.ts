import { combineReducers } from 'redux'
import registerTags from 'modules/registerTags'
import searchTags from 'modules/searchTags'
import quizTags from 'modules/quizTags'

const reducer = combineReducers({
  registerTags,
  searchTags,
  quizTags,
})

export type ReducerType = ReturnType<typeof reducer>
export default reducer
