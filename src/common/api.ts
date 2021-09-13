import axios from 'axios'

const answerLike = (answerId: number, onSuccess: Function, onFailure: Function) => {
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

export { answerLike }
