import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TagSelectorItem } from 'common/type'
import tagItems from 'constants/TagItems'

const registerTags = createSlice({
  name: 'registerTagsReducer',
  initialState: tagItems,
  reducers: {
    setRegisterTagSelected: (
      state: Array<TagSelectorItem>,
      action: PayloadAction<{ tagId: number; isSelected: boolean }>,
    ) => {
      return state.map((tag) =>
        tag.id === action.payload.tagId ? { ...tag, isSelected: action.payload.isSelected } : tag,
      )
    },
  },
})

export const { setRegisterTagSelected } = registerTags.actions
export default registerTags.reducer
