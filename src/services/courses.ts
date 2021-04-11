import { IChapter, IMessage } from '~/interfaces/ICourse'
import course from '../courses-data/communications.json'

export const getCourses = () => {

}

export const getCourseById = (id: number) => {
  console.info(id)
  return course.data
}

export const getMessagesFromChapters = (chapters: IChapter[]): IMessage[] => {
  return chapters.reduce((concatedMessages: IMessage[], chapter: IChapter) => {
    return [...concatedMessages, ...chapter.messages]
  }, []).map((message, index) => ({ id: index, ...message }))
}

// export const concatMessagesWithUserAnswers = (messages, userAnswers) => {
//
// }
