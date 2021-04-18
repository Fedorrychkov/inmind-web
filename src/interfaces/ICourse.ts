export interface IAuthor {
  name: string
  description?: string
  intro?: string
  type?: 'AUTHOR' | 'PERSON'
}

export type IMessageOptions = {
  id: number
  content: string
  color?: string
  messages: IMessage[]
}

export type IMessageChoosenType = {
  type: 'CHOOSEN'
  content: string
  currentAnswer: number
  options: IMessageOptions[]
}

export type IMessageTextType = {
  type: 'TEXT' | 'IMG_URL'
  content: string
}

export type IMessage = {
  id?: number
  type: 'TEXT' | 'CHOOSEN' | 'TEST' | 'IMG_URL'
  content: string
  color?: string
} & (IMessageTextType | IMessageChoosenType)

export interface IChapter {
  id: number
  name: string
  messages: IMessage[]
}

export  interface ICourse {
  id: number
  name: string
  description: string
  author: IAuthor
  chapters: IChapter[]
}
