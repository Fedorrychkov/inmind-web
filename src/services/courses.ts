import { IChapter, IMessage } from '~/interfaces/ICourse'
import { CommunicationCourse } from '../courses-data/communications'

export const getCourses = () => {

}

export const getCourseById = (id: number) => {
  console.info(id)
  return CommunicationCourse.data
}

export const getMessagesFromChapters = (chapters: IChapter[]): IMessage[] => {
  return chapters.reduce((concatedMessages: IMessage[], chapter: IChapter) => {
    return [...concatedMessages, ...chapter.messages]
  }, []).map((message, index) => ({ id: index, ...message }))
}

// export const concatMessagesWithUserAnswers = (messages, userAnswers) => {
//
// }
