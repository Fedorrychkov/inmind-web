export interface IAuthor {
  name: string
  description?: string
  intro?: string
  type?: 'AUTHOR' | 'PERSON'
}

export type Author = 'ME' | 'PERSON' | 'AUTHOR'

export type IMessageOptions = {
  id: number
  content: string
  messages: IMessage[]
  color?: string
}

export type IMessageChoosenType = {
  type: 'CHOOSEN'
  content: string
  options: IMessageOptions[]
}

export type ITestQuestion = IMessageChoosenType & {
  count?: number
}

export type ITestResult = {
  type: 'TEXT'
  count: {
    min?: number
    max?: number
  }
  content?: string
  options: IMessageOptions[]
  messages: IMessage[]
}

export type ITestType = {
  type: 'TEST'
  id: string
  questions: ITestQuestion[]
  content?: string
  results?: ITestResult[]
}

export type IMessageTextType = {
  type: 'TEXT' | 'IMG_URL' | 'VIDEO_URL'
  content: string
}

type SomeTypedMessage = IMessageTextType | IMessageChoosenType | ITestType

export type IMessage = {
  id?: string | number
  testId?: string
  color?: string
  author?: Author
} & SomeTypedMessage

export interface IChapter {
  id: number
  name: string
  messages: IMessage[]
}

export interface ICourse {
  id: number
  name: string
  version: string
  description: string
  author: IAuthor
  chapters: IChapter[]
}
