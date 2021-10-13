import { createSlice } from '@reduxjs/toolkit'

const searchTags = createSlice({
  name: 'searchTagReducer',
  initialState: [],
  reducers: {
    addSearchTag: (state: Array<string>, action) => {
      state.push(action.payload)
    },
    deleteSearchTag: (state, action) => {
      return state.filter((tag) => tag !== action.payload)
    },
  },
})

export const { addSearchTag, deleteSearchTag } = searchTags.actions
export default searchTags.reducer
