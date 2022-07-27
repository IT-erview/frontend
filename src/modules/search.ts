import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TagSelectorItem } from 'utils/type'

export type searchOptions = {
  tags: Array<TagSelectorItem>
  search: boolean
  keyword: string
}

const search = createSlice({
  name: 'searchReducer',
  initialState: { tags: [], search: false, keyword: '' } as searchOptions,
  reducers: {
    setSearchTags: (state: searchOptions, action: PayloadAction<Array<TagSelectorItem>>) => {
      state.tags = action.payload
      return state
    },
    setSearchTagSelected: (state: searchOptions, action: PayloadAction<{ tagId: number; isSelected: boolean }>) => {
      state.tags = state.tags.map((tag) =>
        tag.id === action.payload.tagId ? { ...tag, isSelected: action.payload.isSelected } : tag,
      )
      return state
    },
    setSearchKeyword: (state: searchOptions, action: PayloadAction<string>) => {
      state.keyword = action.payload
      return state
    },
    setSearch: (state: searchOptions, action: PayloadAction<boolean>) => {
      state.search = action.payload
      return state
    },
  },
})

export const { setSearchTags, setSearchTagSelected, setSearchKeyword, setSearch } = search.actions
export default search.reducer
