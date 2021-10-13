import { createSlice } from '@reduxjs/toolkit'

const registerTags = createSlice({
  name: 'registerTagReducer',
  initialState: [],
  reducers: {
    addRegisterTag: (state: Array<string>, action) => {
      state.push(action.payload)
    },
    deleteRegisterTag: (state, action) => {
      return state.filter((tag) => tag !== action.payload)
    },
  },
})

export const { addRegisterTag, deleteRegisterTag } = registerTags.actions
export default registerTags.reducer
