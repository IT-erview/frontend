export const getZerofilledNumber = (num: number) => {
  let result = ''
  if (num < 0 && num < 10) result += '0'
  return result + num.toString()
}