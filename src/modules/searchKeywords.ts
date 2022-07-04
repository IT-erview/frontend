import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const searchKeywords = createSlice({
  name: 'searchKeywordsReducer',
  initialState: '',
  reducers: {
    setSearchKeywords: (state: string, action: PayloadAction<string>) => {
      return action.payload
    },
  },
})

export const { setSearchKeywords } = searchKeywords.actions
export default searchKeywords.reducer
