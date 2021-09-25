// todo: sort 변경
import axios from 'axios'
import { Answer, Bookmark, Question } from './type'

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

///api/v1/question/mine?page=0&size=30&sort=${props.sortBy},desc
// todo: sort 변경
const getMyQuestions = async (sort: string, desc = true, page = 0, rowsPerPage = 30) => {
  const response = await axios({
    method: 'get',
    url: `/api/v1/question/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
  return response.data as Array<Question>
}

const getBookmarks = async (sort: string, desc = true, page = 0, rowsPerPage = 30) => {
  const response = await axios({
    method: 'get',
    url: `/api/v1/bookmark/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
  return response.data.map((bookmark: Bookmark) => {
    return bookmark.question
  })
}

const searchQuestions = async (
  keyword: string,
  sort: string,
  tagList: Array<string> = [],
  desc = true,
  page = 0,
  rowsPerPage = 30,
) => {
  const response = await axios({
    method: 'get',
    url: `/api/v1/question/search?keyword=${keyword}&page=${page}&size=${rowsPerPage}&tags=${tagList}&sort=${sort}${
      desc ? ',desc' : ''
    }`,
  })
  return response.data as Array<Question>
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

const getMyAnswer = async (questionId: number) => {
  const response = await axios({
    method: 'get',
    url: `/api/v1/answer/${questionId}/mine`,
  })
  return response.data as Answer
}

const getAnswers = async (questionId: number, sort: string, page: number, rowsPerPage = 10, desc = true) => {
  const response = await axios({
    method: 'get',
    url: `/api/v1/answer/question/${questionId}?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
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
  const response = await axios({
    method: 'get',
    url: `/api/v1/answer/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
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
  const response = await axios({
    method: 'get',
    url: `/api/v1/answer/like/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
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

export {
  likeAnswer,
  getQuestion,
  getQuestions,
  getHitsAnswers,
  getMyAnswer,
  addBookmark,
  getBookmarks,
  searchQuestions,
  getMyQuestions,
  getMyAnswers,
  getAnswers,
  getMyLikedAnswers,
}
