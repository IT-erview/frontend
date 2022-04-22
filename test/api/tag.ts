// @ts-ignore
import Send from 'test/api/Send.ts'

export const getTags = () => {
  return Send({
    method: 'get',
    url: `/api/v1/tag/`,
  })
}
