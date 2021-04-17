export interface IAuthor {
  name: string
  description?: string
  intro?: string
  type?: 'AUTHOR' | 'PERSON'
}

export type IMessageWithAdditionalType = {
  incorrectType?: 'WITH_ADDITIONAL_CONTENT',
}

export type IMessageAdditionalContent = any

export type IMessageOptions = {
  id: number
  content: string
  color?: string
}

export type IMessageChoosenType = {
  type: 'CHOOSEN'
  content: string
  currentAnswer: number
  additionalContent: IMessageAdditionalContent[]
  options: IMessageOptions[]
}

export type IMessageTextType = {
  type: 'TEXT'
  content: string
}

export type IMessage = {
  id?: number
  type: 'TEXT' | 'CHOOSEN'
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
