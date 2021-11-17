import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TagSelectorItem } from 'common/type'

const searchTags = createSlice({
  name: 'searchTagsReducer',
  initialState: [] as Array<TagSelectorItem>,
  reducers: {
    setSearchTags: (state: Array<TagSelectorItem>, action: PayloadAction<Array<TagSelectorItem>>) => {
      return action.payload
    },
    setSearchTagSelected: (
      state: Array<TagSelectorItem>,
      action: PayloadAction<{ tagId: number; isSelected: boolean }>,
    ) => {
      return state.map((tag) =>
        tag.id === action.payload.tagId ? { ...tag, isSelected: action.payload.isSelected } : tag,
      )
    },
  },
})

export const { setSearchTags, setSearchTagSelected } = searchTags.actions
export default searchTags.reducer
