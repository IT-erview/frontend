import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const resetQuiz = createSlice({
  name: 'resetQuizReducer',
  initialState: false as boolean,
  reducers: {
    setResetQuiz: (state: boolean, action: PayloadAction<boolean>) => {
      return action.payload
    },
  },
})

export const { setResetQuiz } = resetQuiz.actions
export default resetQuiz.reducer
