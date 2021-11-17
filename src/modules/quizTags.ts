import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TagSelectorItem } from 'common/type'

const quizTags = createSlice({
  name: 'quizTagsReducer',
  initialState: [] as Array<TagSelectorItem>,
  reducers: {
    setQuizTags: (state: Array<TagSelectorItem>, action: PayloadAction<Array<TagSelectorItem>>) => {
      return action.payload
    },
    setQuizTagSelected: (
      state: Array<TagSelectorItem>,
      action: PayloadAction<{ tagId: number; isSelected: boolean }>,
    ) => {
      return state.map((tag) =>
        tag.id === action.payload.tagId ? { ...tag, isSelected: action.payload.isSelected } : tag,
      )
    },
  },
})

export const { setQuizTags, setQuizTagSelected } = quizTags.actions
export default quizTags.reducer
