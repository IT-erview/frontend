// @ts-ignore
import Send from 'api/Send.ts'

export const addBookmark = (id: number) => {
  return Send({
    method: 'post',
    url: `/api/v1/bookmark/${id}`,
  })
}
export const getBookmarks = (params: object) => {
  return Send({
    method: 'get',
    url: `/api/v1/bookmark/mine`,
    params: params,
  })
}
export const deleteBookmark = (bookmarkId: number) => {
  return Send({
    method: 'delete',
    url: `/api/v1/bookmark/${bookmarkId}`,
  })
}
