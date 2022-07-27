import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TagSelectorItem } from 'utils/type'
import { Sort } from '../views/common/form/SortSelectBox'

export type filter = {
  tags: Array<TagSelectorItem>
  sort: Sort
}
const searchFilter = createSlice({
  name: 'searchFilterreducer',
  initialState: {
    tags: [],
    sort: Sort.POPULAR,
  } as filter,
  reducers: {
    setFilterTags: (state: filter, action: PayloadAction<Array<TagSelectorItem>>) => {
      state.tags = action.payload
      return state
    },
    setFilterTagSelected: (state: filter, action: PayloadAction<{ tagId: number; isSelected: boolean }>) => {
      state.tags = state.tags.map((tag) =>
        tag.id === action.payload.tagId ? { ...tag, isSelected: action.payload.isSelected } : tag,
      )
      return state
    },
    setFilterSort: (state: filter, action: PayloadAction<Sort>) => {
      state.sort = action.payload
      return state
    },
  },
})

export const { setFilterTags, setFilterTagSelected, setFilterSort } = searchFilter.actions
export default searchFilter.reducer
