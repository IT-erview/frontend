export type Answer = {
  content: string
  createdDate: Date
  id: number
  like: boolean
  liked: number
  modifiedDate: Date
  questionId: number
  userName: string
  questionContent?: string
  tags?: Array<Tag>
}

// todo: 이게 필요한가 싶은데,,
export type Bookmark = {
  createdDate: Date
  email: string
  modifiedDate: Date
  id: number
  question: Question
}

export type Question = {
  bookmarkCount: number
  bookmark: boolean
  content: string
  createdDate: Date
  email: string
  id: number
  modifiedDate: Date
  mostLikedAnswer: Answer
  userName: string
  tagList: Array<Tag>
}
// ToDo: Tag 통일하여 수정 필요
export type Tag = {
  tagTitle: string
}

export type Quiz = {
  content: string
  questionId: number
}

export type TagSelectorItem = {
  id: number
  name: string
  isSelected: boolean
}

export type TagItem = {
  tagId: number
  tagTitle: string
}

export type TagCount = {
  tagId: number
  tagTitle: string
  tagCount: number
}

export type QuestionTags = {
  id: number
  name: string
}

export type QuizQuestion = {
  id: number
  content: string
  username: string
  email: string
  tagList: Array<Tag>
  coreKeyword: {
    id: number
    name: string
  }
  bookmark: boolean
  bookmarkCount: number
  expectedKeywordList: Array<QuestionTags> | null
  expectedKeywordCount: Array<QuestionTags> | null
  depth: number
  level: number
}

export type QuizAnswer = {
  question: QuizQuestion
  answer: string
}
