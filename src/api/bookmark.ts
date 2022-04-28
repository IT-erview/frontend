// @ts-ignore
import Send from 'api/Send.ts'

export const addBookmark = (questionId: number) => {
  return Send({
    method: 'post',
    url: `/api/v1/bookmark/${questionId}`,
  })
}
export const getBookmarks = (params: object) => {
  return Send({
    method: 'get',
    url: `/api/v1/bookmark/mine`,
    params: params,
  })
}
