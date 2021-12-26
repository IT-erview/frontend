import { MIN_TEXT_CONTENTS_LENGTH } from 'common/config'

export const getZerofilledNumber = (num: number) => {
  let result = ''
  if (num > 0 && num < 10) result += '0'
  return result + num.toString()
}

export const isNumeric = (str: string | null) => {
  return str !== null && !isNaN(Number(str))
}

export const checkTextContentsLength = (contents: string) => {
  return contents.length >= MIN_TEXT_CONTENTS_LENGTH || contents.length === 0
}
