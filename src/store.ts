import { configureStore } from '@reduxjs/toolkit'
import reducer from 'modules/rootReducer'

const store = configureStore({
  reducer,
})

export default store
