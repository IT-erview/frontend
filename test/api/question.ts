// @ts-ignore
import Send from 'test/api/Send.ts'
//
// export const getQuestion = (questionId: number) => {
//   return Send({
//     method: 'get',
//     url: `/api/v1/question/${questionId}`,
//   })
// }
// export const getQuestions = (page: number, rowsPerPage: number) => {
//   return Send({
//     method: 'get',
//     url: '/api/v1/question/all',
//     params: {
//       page,
//       size: rowsPerPage,
//     },
//   })
// }
// export const getQuizQuestions = (tagList: Array<number>) => {
//   return Send({
//     method: 'get',
//     url: `/api/v1/question/quiz?tags=${tagList}`,
//   })
// }
// export const getMyQuestions = (sort: string, desc = true, page = 0, rowsPerPage = 30) => {
//   return Send({
//     method: 'get',
//     url: `/api/v1/question/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
//   })
// }
// export const searchQuestions = (
//     keyword: string,
//     sort: string,
//     tagList: Array<number> = [],
//     desc = true,
//     page = 0,
//     rowsPerPage = 30,
// ) => {
//   return Send({
//     method: 'get',
//     url: `/api/v1/question/search?keyword=${keyword}&page=${page}&size=${rowsPerPage}&tags=${tagList}&sort=${sort}${desc ? ',desc' : ''}`,
//   })
// }
export const postQuestion = (data: object) => {
  return Send({
    method: 'post',
    url: '/api/v1/question',
    data: data,
  })
}
// export const getHitsQuestions = (sort: string) => {
//   return Send({
//     method: 'get',
//     url: `/api/v1/question/hits?option=${sort}`,
//   })
// }
// export const getQuestionStat = () => {
//   return Send({
//     method: 'get',
//     url: '/api/v1/question/stat',
//   })
// }
