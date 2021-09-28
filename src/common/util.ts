import { MIN_ANSWER_CONTENTS_LENGTH } from 'constants/constants'

export const getZerofilledNumber = (num: number) => {
  let result = ''
  if (num < 0 && num < 10) result += '0'
  return result + num.toString()
}

export const isNumeric = (str: string | null) => {
  return str !== null && !isNaN(Number(str))
}

export const checkAnswerLength = (answer: string) => {
  const answerLength = answer.length
  if (answerLength > 0 && answerLength < MIN_ANSWER_CONTENTS_LENGTH) {
    return false
  } else {
    return true
  }
}
