import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TagSelectorItem } from 'common/type'
import tagItems from 'constants/TagItems'

const quizTags = createSlice({
  name: 'quizTagsReducer',
  initialState: tagItems,
  reducers: {
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

export const { setQuizTagSelected } = quizTags.actions
export default quizTags.reducer
