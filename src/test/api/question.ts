import axios, { AxiosRequestConfig } from 'axios'
import {Question, QuizQuestion, TagCount} from "utils/type";

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

const getQuestion = async (questionId: number) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/question/${questionId}`,
  })
  if (!response) return null
  return response.data as Question
}

const getQuestions = async (page: number, rowsPerPage: number) => {
  const response = await request({
    method: 'get',
    url: '/api/v1/question/all',
    params: {
      page,
      size: rowsPerPage,
    },
  })
  if (!response) return []
  return response.data as Array<Question>
}

const getQuizQuestions = async (tagList: Array<number>) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/question/quiz?tags=${tagList}`,
  })
  if (!response) return null
  return response.data as QuizQuestion
}

///api/v1/question/mine?page=0&size=30&sort=${props.sortBy},desc
// todo: sort 변경
const getMyQuestions = async (sort: string, desc = true, page = 0, rowsPerPage = 30) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/question/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
  if (!response) return []
  return response.data as Array<Question>
}

const searchQuestions = async (
    keyword: string,
    sort: string,
    tagList: Array<number> = [],
    desc = true,
    page = 0,
    rowsPerPage = 30,
) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/question/search?keyword=${keyword}&page=${page}&size=${rowsPerPage}&tags=${tagList}&sort=${sort}${
        desc ? ',desc' : ''
    }`,
  })
  if (!response) return []
  return response.data as Array<Question>
}

const postQuestion = async (content: string, tag: number) => {
  const response = await request({
    method: 'post',
    url: '/api/v1/question',
    data: {
      content: content,
      bookmarkCount: 0,
      tags: [tag],
      depth: 1,
      expectedKeywords: [1],
      keywordId: 1,
      level: 1,
    },
  })
  return response ? true : false
}

const getHitsQuestions = async (sort: string) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/question/hits?option=${sort}`,
  })
  if (!response) return null
  return response.data as Array<Question>
}

const getQuestionStat = async () => {
  const response = await request({
    method: 'get',
    url: '/api/v1/question/stat',
  })
  if (!response) return null
  return response.data as Array<TagCount>
}

export {
  getQuestion,
  getQuestions,
  getQuizQuestions,
  searchQuestions,
  getMyQuestions,
  postQuestion,
  getHitsQuestions,
  getQuestionStat,
}
