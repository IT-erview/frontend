import axios, { AxiosRequestConfig } from 'axios'
import { Answer, Quiz, QuizQuestion } from 'utils/type'

const request = async (config: AxiosRequestConfig) => {
  try {
    return await axios(config)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // todo: 공통 에러 처리
    } else {
      console.log(error)
      // todo: 문구 변경
      alert(error)
    }
    return null
  }
}

const likeAnswer = (answerId: number, onSuccess: Function, onFailure: Function) => {
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

const getMyAnswer = async (questionId: number) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/answer/${questionId}/mine`,
  })
  if (!response) return null
  return response.data as Answer
}

const getAnswers = async (questionId: number, sort: string, page: number, rowsPerPage = 10, desc = true) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/answer/question/${questionId}?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
  if (!response) return []
  // todo: api 수정 후 아래와 주석과 같은 형태로 코드 수정되어야함
  // return response.data.content ? (response.data.content as Array<Answer>) : []
  const content: Array<any> = response.data.content
  if (!content) return []
  return content.map((item: any) => {
    const answer = item as Answer
    answer.questionContent = item.question?.content
    answer.tags = item.question?.tagList
    return answer
  })
}

const getMyAnswers = async (sort: string, page: number, rowsPerPage = 4, desc = true) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/answer/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
  if (!response) return []
  // todo: api 수정 후 아래와 주석과 같은 형태로 코드 수정되어야함
  // return response.data.content ? (response.data.content as Array<Answer>) : []
  const content: Array<any> = response.data.content
  if (!content) return []
  return content.map((item: any) => {
    const answer = item as Answer
    answer.questionContent = item.question?.content
    answer.tags = item.question?.tagList
    return answer
  })
}

const getMyLikedAnswers = async (sort: string, page: number, rowsPerPage = 4, desc = true) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/answer/like/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
  if (!response) return []
  // todo: api 수정 후 아래와 주석과 같은 형태로 코드 수정되어야함
  // return response.data.content ? (response.data.content as Array<Answer>) : []
  const content: Array<any> = response.data.content
  if (!content) return []
  return content.map((item: any) => {
    const answer = item as Answer
    answer.questionContent = item.question?.content
    answer.tags = item.question?.tagList
    return answer
  })
}

const postAnswer = async (answer: Quiz) => {
  const response = await request({
    method: 'post',
    url: '/api/v1/answer',
    data: {
      content: answer.content,
      questionId: answer.questionId,
    },
  })
  return response ? true : false
}

const postQuizAnswers = async (answer: Quiz, type: string) => {
  const response = await request({
    method: 'post',
    url: `/api/v1/question/quiz?type=${type}`,
    data: {
      content: answer.content,
      questionId: answer.questionId,
    },
  })
  if (response) {
    const nextQuestion: QuizQuestion = response.data
    return nextQuestion
  }
  return null
}

const getHitsAnswers = async (sort: string) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/answer/hits?option=${sort}`,
  })
  if (!response) return null
  return response.data as Array<Answer>
}

export {
  likeAnswer,
  getMyAnswer,
  getAnswers,
  getMyAnswers,
  getMyLikedAnswers,
  postAnswer,
  postQuizAnswers,
  getHitsAnswers,
}
