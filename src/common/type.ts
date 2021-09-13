export type Answer = {
  content: string
  createdDate: Date
  id: number
  liked: number
  modifiedDate: Date
  questionId: number
  userName: string
  questionContent?: string
  tags: Array<string>
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
  tagList: Array<string>
}
