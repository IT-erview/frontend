import axios, { AxiosRequestConfig } from 'axios'
import { Bookmark } from 'utils/type'

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

const addBookmark = async (questionId: number) => {
  const response = await request({
    method: 'post',
    url: `/api/v1/bookmark/${questionId}`,
  })
  return response ? true : false
}

export { addBookmark, getBookmarks }
