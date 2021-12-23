// todo: sort 변경
import axios, { AxiosRequestConfig } from 'axios'
import { Answer, Bookmark, Question, Quiz, QuizQuestion, TagCount, TagItem } from 'common/type'

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

const getBookmarks = async (sort: string, desc = true, page = 0, rowsPerPage = 30) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/bookmark/mine?page=${page}&size=${rowsPerPage}&sort=${sort}${desc ? ',desc' : ''}`,
  })
  if (!response) return []
  return response.data.map((bookmark: Bookmark) => {
    return bookmark.question
  })
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

const addBookmark = async (questionId: number) => {
  const response = await request({
    method: 'post',
    url: `/api/v1/bookmark/${questionId}`,
  })
  return response ? true : false
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
const postAnswer = async (questionId: number, content: string) => {
  const response = await request({
    method: 'post',
    url: '/api/v1/answer',
    data: {
      content: content,
      questionId: questionId,
    },
  })
  return response ? true : false
}

const postQuizAnswers = async (quizAnswers: Array<Quiz>) => {
  const response = await request({
    method: 'post',
    url: '/api/v1/answer/',
    data: quizAnswers,
  })
  return response ? true : false
}

const postQuestion = async (content: string, tagList: Array<string>) => {
  const response = await request({
    method: 'post',
    url: '/api/v1/question',
    data: {
      content: content,
      bookmarkCount: 0,
      tags: [5],
      depth: 1,
      expectedKeywords: [1],
      keywordId: 1,
      level: 1,
      minKeywordCount: 1,
    },
  })
  return response ? true : false
}

const getTags = async () => {
  const response = await request({
    method: 'get',
    url: `/api/v1/tag/`,
  })
  if (!response) return null
  return response.data as Array<TagItem>
}

const getHitsQuestions = async (sort: string) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/question/hits?option=${sort}`,
  })
  if (!response) return null
  return response.data as Array<Question>
}

const getHitsAnswers = async (sort: string) => {
  const response = await request({
    method: 'get',
    url: `/api/v1/answer/hits?option=${sort}`,
  })
  if (!response) return null
  return response.data as Array<Answer>
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
  likeAnswer,
  getQuestion,
  getQuestions,
  getQuizQuestions,
  getMyAnswer,
  addBookmark,
  getBookmarks,
  searchQuestions,
  getMyQuestions,
  getMyAnswers,
  getAnswers,
  getMyLikedAnswers,
  postAnswer,
  postQuizAnswers,
  postQuestion,
  getTags,
  getHitsQuestions,
  getHitsAnswers,
  getQuestionStat,
}
