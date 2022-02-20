import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuizQuestion } from 'common/type'

const quizQuestions = createSlice({
  name: 'quizQuestionsReducer',
  initialState: [] as Array<QuizQuestion>,
  reducers: {
    setQuizQuestions: (state: Array<QuizQuestion>, action: PayloadAction<QuizQuestion>) => {
      return [...state, action.payload]
    },
    setQuizQuestionsReset: (state: Array<QuizQuestion>) => {
      return []
    },
  },
})

export const { setQuizQuestions, setQuizQuestionsReset } = quizQuestions.actions
export default quizQuestions.reducer
