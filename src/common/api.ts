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

export { answerLike, getQuestions, getHitsAnswers }
