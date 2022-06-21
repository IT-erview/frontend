// @ts-ignore
import Send from 'api/Send.ts'

export const getActivity = () => {
  return Send({
    method: 'get',
    url: `/api/v1/user/activity`,
  })
}
