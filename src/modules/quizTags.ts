import { createSlice } from '@reduxjs/toolkit'

const quizTags = createSlice({
  name: 'quizTagsReducer',
  initialState: [],
  reducers: {
    addQuizTag: (state: Array<string>, action) => {
      state.push(action.payload)
    },
    deleteQuizTag: (state, action) => {
      return state.filter((tag) => tag !== action.payload)
    },
  },
})

export const { addQuizTag, deleteQuizTag } = quizTags.actions
export default quizTags.reducer
