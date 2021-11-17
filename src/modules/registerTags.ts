import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TagSelectorItem } from 'common/type'

const registerTags = createSlice({
  name: 'registerTagsReducer',
  initialState: [] as Array<TagSelectorItem>,
  reducers: {
    setRegisterTags: (state: Array<TagSelectorItem>, action: PayloadAction<Array<TagSelectorItem>>) => {
      return action.payload
    },
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

export const { setRegisterTags, setRegisterTagSelected } = registerTags.actions
export default registerTags.reducer
