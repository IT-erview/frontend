// @ts-ignore
import Send from 'test/api/Send.ts'
import { Quiz } from 'src/utils/type'

export const likeAnswer = (answerId: number) => {
  return Send({
    method: 'post',
    url: '/api/v1/answer/like',
    params: {
      answerId,
    },
  })
}

export const getAnswers = (questionId: number, sort: string, page: number, rowsPerPage = 10, desc = true) => {
  return Send({
    method: 'get',
    url: `/api/v1/answer/question/${questionId}?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
}
export const getMyAnswer = (questionId: number) => {
  return Send({
    method: 'get',
    url: `/api/v1/answer/${questionId}/mine`,
  })
}
export const getMyAnswers = (sort: string, page: number, rowsPerPage = 4, desc = true) => {
  return Send({
    method: 'get',
    url: `/api/v1/answer/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
}
export const getMyLikedAnswers = (sort: string, page: number, rowsPerPage = 4, desc = true) => {
  return Send({
    method: 'get',
    url: `/api/v1/answer/like/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
}
export const getHitsAnswers = (sort: string) => {
  return Send({
    method: 'get',
    url: `/api/v1/answer/hits?option=${sort}`,
  })
}
export const postAnswer = (answer: Quiz) => {
  return Send({
    method: 'post',
    url: '/api/v1/answer',
    data: {
      content: answer.content,
      questionId: answer.questionId,
    },
  })
}
export const postQuizAnswers = (answer: Quiz, type: string) => {
  return Send({
    method: 'post',
    url: `/api/v1/question/quiz?type=${type}`,
    data: {
      content: answer.content,
      questionId: answer.questionId,
    },
  })
}
export const addBookmark = (questionId: number) => {
  return Send({
    method: 'post',
    url: `/api/v1/bookmark/${questionId}`,
  })
}
export const getBookmarks = (sort: string, desc = true, page = 0, rowsPerPage = 30) => {
  return Send({
    method: 'get',
    url: `/api/v1/bookmark/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
}
