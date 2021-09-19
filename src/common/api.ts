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

const getBookmarks = async (sort: string, desc = true, page = 0, rowsPerPage = 30) => {
  const response = await axios({
    method: 'get',
    url: `/api/v1/bookmark/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
  return response.data.map((bookmark: Bookmark) => {
    return bookmark.question
  })
}

// todo: sort 변경
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
}
