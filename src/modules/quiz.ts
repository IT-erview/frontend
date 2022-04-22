import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuizQuestion } from 'utils/type'

const quiz = createSlice({
  name: 'quiz',
  initialState: {} as QuizQuestion,
  reducers: {
    setQuiz: (state: object, action: PayloadAction<any>) => {
      return action.payload
    }
  }
})

export default quiz
