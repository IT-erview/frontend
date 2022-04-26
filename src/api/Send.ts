import axios from 'axios'
import { JWT_TOKEN } from 'constants/Oauth'

const instance = axios.create({
  baseURL: '/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: JWT_TOKEN ? `Bearer ${JWT_TOKEN}` : '',
  },
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    return response
  },

  (error) => {
    return Promise.reject(error)
  },
)

export default instance
