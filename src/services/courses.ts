import { COURSE_INTERACTIONS } from '~/constants/course-interaction-types'
import { MESSAGES_HISOTRY_KEY, USER_ANSWERS_KEY } from '~/constants/storage-keys'
import { IChapter, ICourse, IMessage } from '~/interfaces/ICourse'
import { CommunicationCourse } from '../courses-data/communications'

type CourseHistory = Pick<ICourse, 'id'> & { messagesHistory: IMessage[] }
// type CourseContent<T> = {
//   id: number
// } & keyof T

// type AnswersCourseContent = {
//   answers: {
//     id: string | number
//     messageId: string | number
//   }
// }

export const getCourses = () => {

}

export const getCourseContentById = (courseId: number, key: string) => {
  try {
    const course = localStorage.getItem(key)
    const parsedCourse = course ? JSON.parse(course) : []
    const currentCourse = parsedCourse.find((current: CourseHistory) => courseId === current.id)

    return currentCourse || {}
  } catch (ex) {
    console.error(ex)
  }
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

export const getCourseHistory = (courseId: number) => {
  try {
    const currentCourse = getCourseContentById(courseId, MESSAGES_HISOTRY_KEY)
    const { messagesHistory, ...course } = currentCourse || {}

    if (!messagesHistory) {
      return {}
    }

    const validHistory = messagesHistory.filter((message: IMessage, index: number) => {
      if (
        messagesHistory.length - 1 === index &&
        [COURSE_INTERACTIONS.CHOOSEN, COURSE_INTERACTIONS.TEXT_INPUT].includes(message.type)
      ) {
        return false
      }

      return true
    })

    return {
      ...course,
      messagesHistory: validHistory,
    }
  } catch (ex) {
    console.error(ex)
  }
}

export const setCourseHistoriesByCourse = (course: ICourse, messages: IMessage[]) => {
  try {
    const history = localStorage.getItem(MESSAGES_HISOTRY_KEY)
    const parsedHistory = history ? JSON.parse(history) : []
    const otherCourses = parsedHistory.filter((current: CourseHistory) => course.id !== current.id)
    const currentCourse = parsedHistory.find((current: CourseHistory) => course.id === current.id)
    const payload = currentCourse ? {
      ...currentCourse,
      version: course.version,
      messagesHistory: messages,
    } : {
      id: course.id,
      version: course.version,
      messagesHistory: messages,
    }

    localStorage.setItem(MESSAGES_HISOTRY_KEY, JSON.stringify([...otherCourses, payload]))
  } catch (ex) {
    console.error(ex)
  }
}

export const getRemainingMessages = (allMessages: IMessage[], historyMesesages: IMessage[]) => {
  return allMessages.filter(message => {
    const found = historyMesesages.find(history => history.id === message.id)

    return !!found ? false : true
  })
}

export const setCourseAnswers = (courseId: number, answer: any) => {
  try {
    const coursesAnswers = localStorage.getItem(USER_ANSWERS_KEY)
    const parsedAnswers = coursesAnswers ? JSON.parse(coursesAnswers) : []
    const otherAnswers = parsedAnswers.filter((current: CourseHistory) => courseId !== current.id)
    const currentAnswers = parsedAnswers.find((current: CourseHistory) => courseId === current.id)
    const answers = currentAnswers ? [...currentAnswers?.answers, answer] : [answer]
    const payload = currentAnswers ? {
      ...currentAnswers,
      answers,
    } : {
      id: courseId,
      answers,
    }

    localStorage.setItem(USER_ANSWERS_KEY, JSON.stringify([...otherAnswers, payload]))
  } catch (ex) {
    console.error(ex)
  }
}

export const getCourseAnswers = (courseId: number) => {
  try {
    const { answers } = getCourseContentById(courseId, USER_ANSWERS_KEY)

    return answers || []
  } catch (ex) {
    console.error(ex)
  }
}

// export const concatMessagesWithUserAnswers = (messages, userAnswers) => {
//
// }
