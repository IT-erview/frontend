import axios from 'axios'
import { Answer, Question } from './type'

const answerLike = (answerId: number, onSuccess: Function, onFailure: Function) => {
  axios({
    method: 'post',
    url: '/api/v1/answer/like',
    params: {
      answerId,
    },
  })
    .then((res) => {
      console.log(res)
      onSuccess()
    })
    .catch((err) => {
      console.log(err)
      onFailure()
    })
}

const getQuestion = async (questionId: number) => {
  const response = await axios({
    method: 'get',
    url: `/api/v1/question/${questionId}`,
  })
  return response.data as Question
}

const getQuestions = async (page: number, rowsPerPage: number) => {
  const response = await axios({
    method: 'get',
    url: '/api/v1/question/all',
    params: {
      page,
      size: rowsPerPage,
    },
  })
  return response.data as Array<Question>
}

const getHitsAnswers = async () => {
  const response = await axios({
    method: 'get',
    url: '/api/v1/answer/hits',
  })
  return response.data as Array<Answer>
}

const getMyAnswer = async (questionId: number) => {
  try {
    const response = await axios({
      method: 'get',
      url: `/api/v1/answer/${questionId}/mine`,
    })
    return response.data as Answer
  } catch (e) {
    return
  }
}

const addBookmark = async (questionId: number) => {
  try {
    await axios({
      method: 'post',
      url: `/api/v1/bookmark/${questionId}`,
    })
    return true
  } catch (e) {
    return false
  }
}

export { answerLike, getQuestion, getQuestions, getHitsAnswers, getMyAnswer, addBookmark }
