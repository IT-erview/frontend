import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TagItem, TagSelectorItem } from 'common/type'

const allTags = createSlice({
  name: 'allTagsReducer',
  initialState: [] as Array<TagSelectorItem>,
  reducers: {
    setAllTags: (state: Array<TagSelectorItem>, action: PayloadAction<Array<TagItem>>) => {
      action.payload.map((tag) => state.push({ id: tag.tagId, name: tag.tagTitle, isSelected: false }))
      return state
    },
  },
})

export const { setAllTags } = allTags.actions
export default allTags.reducer
