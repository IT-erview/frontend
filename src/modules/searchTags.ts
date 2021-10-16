import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TagSelectorItem } from 'common/type'
import tagItems from 'constants/TagItems'

const searchTags = createSlice({
  name: 'searchTagsReducer',
  initialState: tagItems,
  reducers: {
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

export const { setSearchTagSelected } = searchTags.actions
export default searchTags.reducer
