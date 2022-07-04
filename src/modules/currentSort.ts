import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//import { Sort } from 'views/common/form/SortSelectBox'

export enum Sort {
  POPULAR = 'popular',
  LATEST = 'latest',
}

const currentSort = createSlice({
  name: 'currentSortReducer',
  initialState: Sort.POPULAR,
  reducers: {
    setCurrentSort: (state: Sort, action: PayloadAction<Sort>) => {
      return action.payload
    },
  },
})

export const { setCurrentSort } = currentSort.actions
export default currentSort.reducer
