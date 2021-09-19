export type Answer = {
  content: string
  createdDate: Date
  id: number
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
  content: string
  createdDate: Date
  email: string
  id: number
  modifiedDate: Date
  mostLikedAnswer: Answer
  userName: string
  tagList: Array<Tag>
}

export type Tag = {
  tagTitle: string
}
