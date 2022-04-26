import axios, { AxiosRequestConfig } from 'axios'
import { TagItem } from 'utils/type'

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

const getTags = async () => {
  const response = await request({
    method: 'get',
    url: `/api/v1/tag/`,
  })
  if (!response) return null
  return response.data as Array<TagItem>
}

export { getTags }
