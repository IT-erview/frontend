import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Question } from 'utils/type'

const searchResults = createSlice({
  name: 'searchResultsReducer',
  initialState: [] as Array<Question>,
  reducers: {
    setSearchResults: (state: Array<Question>, action: PayloadAction<Array<Question>>) => {
      return action.payload
    },
  },
})

export const { setSearchResults } = searchResults.actions
export default searchResults.reducer
