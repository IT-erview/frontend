// @ts-ignore
import Send from 'api/Send.ts'

export const getQuestion = (id: number) => {
  return Send({
    method: 'get',
    url: `/api/v1/question/${id}`,
  })
}
export const getQuestions = (page: number, rowsPerPage: number) => {
  return Send({
    method: 'get',
    url: '/api/v1/question/all',
    params: {
      page,
      size: rowsPerPage,
    },
  })
}
export const getQuizQuestions = (params: object) => {
  return Send({
    method: 'get',
    url: `/api/v1/question/quiz`,
    params: params,
  })
}
export const getMyQuestions = (params: object) => {
  return Send({
    method: 'get',
    url: `/api/v1/question/mine`,
    params: params,
  })
}
export const searchQuestions = (params: object) => {
  return Send({
    method: 'get',
    url: `/api/v1/question/search`,
    params: params,
  })
}
export const postQuestion = (data: object) => {
  return Send({
    method: 'post',
    url: '/api/v1/question',
    data: data,
  })
}
export const getHitsQuestions = (params: object) => {
  return Send({
    method: 'get',
    url: `/api/v1/question/hits`,
    params: params,
  })
}
export const getQuestionStat = () => {
  return Send({
    method: 'get',
    url: '/api/v1/question/stat',
  })
}
