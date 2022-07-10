import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const searchTotalElement = createSlice({
  name: 'searchTotalElementReducer',
  initialState: 100,
  reducers: {
    setSearchTotalElement: (state: number, action: PayloadAction<number>) => {
      return action.payload
    },
  },
})

export const { setSearchTotalElement } = searchTotalElement.actions
export default searchTotalElement.reducer
