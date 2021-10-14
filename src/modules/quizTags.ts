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
    clearQuizTag: () => {
      return []
    },
  },
})

export const { addQuizTag, deleteQuizTag, clearQuizTag } = quizTags.actions
export default quizTags.reducer
