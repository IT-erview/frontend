import { MIN_TEXT_CONTENTS_LENGTH } from 'common/config'
import { getQuestion } from 'common/api'

export const getZerofilledNumber = (num: number) => {
  let result = ''
  if (num < 0 && num < 10) result += '0'
  return result + num.toString()
}

export const isNumeric = (str: string | null) => {
  return str !== null && !isNaN(Number(str))
}

export const checkTextContentsLength = (contents: string) => {
  return contents.length >= MIN_TEXT_CONTENTS_LENGTH
}

export const getParsedParameters = () => {
  const questionIdParameters = new URLSearchParams(window.location.search).get('question_id')
  return {
    questionId: isNumeric(questionIdParameters) ? Number(questionIdParameters) : undefined,
  }
}

export const getQuestionContent = async (questionId: number | undefined, setQuestionContent: Function) => {
  if (questionId !== undefined) {
    const question = await getQuestion(questionId)
    if (question) setQuestionContent(question.content)
  }
}
