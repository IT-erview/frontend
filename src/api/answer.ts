// @ts-ignore
import Send from 'api/Send.ts'

export const likeAnswer = (answerId: number) => {
  return Send({
    method: 'post',
    url: '/api/v1/answer/like',
    params: {
      answerId,
    },
  })
}

export const getAnswers = (questionId: number, params: object) => {
  return Send({
    method: 'get',
    url: `/api/v1/answer/question/${questionId}`,
    params: params,
  })
}
export const getMyAnswer = (questionId: number) => {
  return Send({
    method: 'get',
    url: `/api/v1/answer/${questionId}/mine`,
  })
}
export const getMyAnswers = (params: object) => {
  return Send({
    method: 'get',
    url: `/api/v1/answer/mine`,
    params: params,
  })
}
export const getMyLikedAnswers = (params: object) => {
  return Send({
    method: 'get',
    url: `/api/v1/answer/like/mine`,
    params: params,
  })
}
export const getHitsAnswers = (params: object) => {
  return Send({
    method: 'get',
    url: `/api/v1/answer/hits`,
    params: params,
  })
}
export const postAnswer = (data: object) => {
  return Send({
    method: 'post',
    url: '/api/v1/answer',
    data: data,
  })
}
export const postQuizAnswers = (params: object, data: object) => {
  return Send({
    method: 'post',
    url: `/api/v1/question/quiz`,
    params: params,
    data: data,
  })
}
