import axios from 'axios'

const instance = axios.create({
  baseURL: '/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
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
