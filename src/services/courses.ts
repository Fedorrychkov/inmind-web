import { COURSE_INTERACTIONS } from '~/constants/course-interaction-types'
import { MESSAGES_HISOTRY_KEY, USER_ANSWERS_KEY } from '~/constants/storage-keys'
import { IChapter, ICourse, IMessage, ITestType } from '~/interfaces/ICourse'
import { CommunicationCourse } from '../courses-data/communications'

type CourseHistory = Pick<ICourse, 'id'> & { messagesHistory: IMessage[] }

export type UserAnswer = {
  id?: string | number
  messageId?: string
  value?: string | any,
  variable?: string,
  count?: number
  testId?: string
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
  const openedAllMessages = allMessages
    .reduce((messages: IMessage[], message: IMessage) => {
      if (message.type === 'TEST') {
        const { questions } = message
        const parsedQuestions = questions.map((question, index: number) =>
          ({ ...question, id: `${message.id}-${index}`, testId: message.id }),
        )

        return [...messages, ...parsedQuestions]
      } else {
        return [...messages, message]
      }
    }, [])

  return openedAllMessages.filter(message => {
    const found = historyMesesages.find(history => history.id === message.id)

    return !!found ? false : true
  })
}

export const getCurrentTestByHistory = (
  allMessages: IMessage[],
  historyMesesages: IMessage[],
): IMessage | undefined => {
  const allTests = allMessages.filter(message => message.type === 'TEST')

  if (!allTests || !allTests.length) return

  const allQuestionsByTestsInHistory = historyMesesages
    .filter(message => message.testId)
    .reduce((tests: Record<string, IMessage[]>, message: IMessage) => {
      const currentTestId = message.testId

      return currentTestId && tests[currentTestId] ? {
        ...tests,
        [currentTestId]: [
          ...tests[currentTestId],
          message,
        ],
      } : {
        ...tests,
        [currentTestId as string]: [message],
      }
    }, {})

  const currentTest = allTests.find((test: IMessage) => {
    if (test.type !== 'TEST') return false

    const currentTestFromHistory = allQuestionsByTestsInHistory[test.id]

    return currentTestFromHistory ? test.questions.length !== currentTestFromHistory.length : false
  })

  return currentTest
}

export const getCurrentTestByMessage = (messages: IMessage[], currentMessage: IMessage): ITestType | undefined => {
  const currentTest = messages.find(message => currentMessage.testId === message.id)

  return currentTest && currentTest.type === 'TEST' ? currentTest : undefined
}

export const getCurrentTestValue = (currentTest: ITestType, userAnswers: UserAnswer[]) => {
  return userAnswers
    .filter(answer => answer.testId === currentTest.id)
    .reduce((count: number, answer) => answer.count ? count + answer.count : count, 0)
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
