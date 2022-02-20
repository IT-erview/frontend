import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum NextQuiz {
  INIT = 'init',
  DEEP = 'deep',
  NEW = 'new',
  QUIT = 'quit',
}

const nextQuestion = createSlice({
  name: 'nextQuestionReducer',
  initialState: NextQuiz.INIT,
  reducers: {
    setNextQuestion: (state: NextQuiz, action: PayloadAction<NextQuiz>) => {
      return action.payload
    },
    setNextQuestionInit: (state: NextQuiz) => {
      return NextQuiz.INIT
    },
  },
})

export const { setNextQuestion, setNextQuestionInit } = nextQuestion.actions
export default nextQuestion.reducer
