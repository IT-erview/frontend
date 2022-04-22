import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuizAnswer, QuizQuestion } from 'utils/type'

const quizQuestions = createSlice({
  name: 'quizQuestionsReducer',
  initialState: [] as Array<QuizAnswer>,
  reducers: {
    setQuizQuestions: (state: Array<QuizAnswer>, action: PayloadAction<QuizQuestion>) => {
      return [...state, { question: action.payload, answer: '' }]
    },
    setQuizAnswers: (state: Array<QuizAnswer>, action: PayloadAction<string>) => {
      state[state.length - 1].answer = action.payload
      return state
    },
    setQuizQuestionsReset: (state: Array<QuizAnswer>) => {
      return []
    },
  },
})

export const { setQuizQuestions, setQuizAnswers, setQuizQuestionsReset } = quizQuestions.actions
export default quizQuestions.reducer
