import { combineReducers } from 'redux'
import registerTags from 'modules/registerTags'
import searchTags from 'modules/searchTags'

const reducer = combineReducers({
  registerTags,
  searchTags,
})

export type ReducerType = ReturnType<typeof reducer>
export default reducer
