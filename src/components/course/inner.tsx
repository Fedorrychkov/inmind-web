import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChatInteraction } from '../chat/chat-interaction'
import { MessageGroup } from '../chat/message-group'
import { CourseHeader } from './header'
import { useWrappedRef } from '~/hooks/use-ref'
import { IMessage, ITestResult } from '~/interfaces/ICourse'
import { Box, BoxProps } from '~/primitives/box'
import {
  getCourseAnswers,
  getCourseHistory,
  getMessagesFromChapters,
  getRemainingMessages,
  setCourseAnswers,
  setCourseHistoriesByCourse,
} from '~/services/courses'
import { COURSE_INTERACTIONS } from '~/constants/course-interaction-types'
import { styled } from '~/theming/styled'
import { ITestQuestion } from '~/interfaces/ICourse'

type Props = {
  course: any
} & BoxProps

export const CourseInner = ({ course, ...boxProps }: Props) => {
  const { name, author, id } = course
  const scrollRef = useWrappedRef()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState<IMessage | any>({})
  const [userAnswers, setUserAnswers] = useState([])
  const [currentType, setCurrentType] = useState('')
  const [awaitedMessages, setAwaitedMessages] = useState<IMessage[]>([])
  const [responseOptions, setResponseOptions] = useState([])
  const [messagesHistory, setMessagesHistory] = useState([])
  const [currentTestResults, setCurrentTestResults] = useState<ITestResult[] | null>([])
  const [currentTestValue, setCurrentTestValue] = useState(0)
  const [currentTestId, setCurrentTestId] = useState('')
  const [inited, setInited] = useState(false)

  const handleShowAnswerQuestions = useCallback((message, cb = () => {}, otherMessages: IMessage[]) => {
    if (![COURSE_INTERACTIONS.CHOOSEN, COURSE_INTERACTIONS.TEXT_INPUT].includes(message.type)) {
      return cb()
    }

    setCurrentType(message.type)
    setCurrentMessage(message)
    setAwaitedMessages(otherMessages)
    message.type === COURSE_INTERACTIONS.CHOOSEN && setResponseOptions(message.options)
  }, [setCurrentType, setAwaitedMessages, setCurrentMessage, setResponseOptions])

  const getCurrentTestResult = useCallback(() => {
    const result = currentTestResults?.find((result) => {
      const { min, max } = result.count

      if ((min !== undefined ? currentTestValue > min : true) && (max !== undefined ? currentTestValue <= max : true)) {
        return result
      }

      return false
    })

    if (!result) return undefined

    const { type, content, options } = result

    return { id: `${currentTestId}-result`, isResult: true, type, content, options }
  }, [currentTestId, currentTestValue, currentTestResults])

  const prepareGetCourseResult = useCallback((messages) => {
    const hasCurrentTestMessages = messages.reduce((acc: number, message: IMessage) =>
      currentTestId === message.testId ? acc + 1 : acc, 0)
    const currentResultMessage = getCurrentTestResult()
    const computedMessage = currentResultMessage ? [currentResultMessage, ...messages] : messages

    if (hasCurrentTestMessages === 1) {
      const [message, ...otherMessages] = messages

      return currentResultMessage ? [message, currentResultMessage, ...otherMessages] : messages
    }

    return !!hasCurrentTestMessages ? messages : computedMessage
  }, [currentTestId, getCurrentTestResult])

  const handleSetMessages = useCallback((currMessages: IMessage[]) => {
    if (!currMessages.length) return

    setTimeout(() => {
      const [message, ...otherMessages] = currMessages

      if (message.type === 'TEST') {
        const { questions, results } = message
        const parsedQuestions = questions.map((question, index: number) => ({ ...question, id: `${message.id}-${index}`, testId: message.id }))
        const [question, ...otherQuestions] = parsedQuestions || []
        const computedMessages = [...otherQuestions, ...otherMessages]

        // TODO: Нужно создать метод и отдельный проперти для хранения тестов,
        // TODO: с флагами: тест окончен и тд, считать локально, а хранить в локалсторедже
        // TODO: Нужно добавить кеширование ответов в локалсторедже и пофиксить после перезапуска сразу после конца
        // TODO: теста
        setCurrentTestResults(results || [])
        setCurrentTestId(message.id)
        setMessages(state => {
          setCourseHistoriesByCourse(course, [...state, question])

          return [...state, question]
        })
        handleShowAnswerQuestions(question, () => handleSetMessages(computedMessages), computedMessages)
      } else {
        const [currentMessage, ...someNextMessages] = message.testId ?
          prepareGetCourseResult([message, ...otherMessages]) : [message, ...otherMessages]

        setMessages(state => {
          setCourseHistoriesByCourse(course, [...state, currentMessage])

          if (currentMessage.isResult) {
            setCurrentTestValue(0)
            setCurrentTestId('')
            setCurrentTestResults([])
          }

          return [...state, currentMessage]
        })
        handleShowAnswerQuestions(currentMessage, () => handleSetMessages(someNextMessages), someNextMessages)
      }
    }, 1000)
  }, [handleShowAnswerQuestions, setMessages, setCurrentTestResults, prepareGetCourseResult, course])

  const onSelectOption = useCallback((optionId) => {
    const selectedOption: IMessage | any = responseOptions.find(({ id }) => id === optionId)

    selectedOption && setMessages(state => [...state, { type: 'TEXT', author: 'ME', ...selectedOption }])
    selectedOption && setResponseOptions([])
    selectedOption && setCurrentType('')

    if (selectedOption) {
      const lastMessage = messages[messages.length - 1]
      const count = (selectedOption as ITestQuestion).count
      const testId = (lastMessage as ITestQuestion & { testId: string }).testId

      testId && count && setCurrentTestValue(state => state + count)
      setCourseAnswers(id, { id: selectedOption.id, messageId: lastMessage.id, count, testId })
    }

    if (selectedOption && selectedOption.messages && selectedOption.messages.length) {
      const payload = [
        ...selectedOption.messages,
        ...awaitedMessages,
      ]

      handleSetMessages(payload)
      return
    }

    if (selectedOption && selectedOption?.questions?.length) {
      const payload = [
        ...selectedOption.questions,
        ...awaitedMessages,
      ]

      handleSetMessages(payload)
      return
    }

    selectedOption && handleSetMessages(awaitedMessages)
  }, [id, awaitedMessages, responseOptions, messages, handleSetMessages, setMessages])

  const flatMessages = useMemo(() => {
    const flattedMessages = getMessagesFromChapters(course.chapters)

    return flattedMessages
  }, [course])

  useEffect(() => {
    if (inited) return () => {}
    const answers = getCourseAnswers(id)
    const { messagesHistory } = getCourseHistory(id)

    try {
      answers && setUserAnswers(answers || [])
      messagesHistory && setMessagesHistory(messagesHistory || [])

      const remainingMessages = getRemainingMessages(flatMessages, messagesHistory || [])
      setMessages(messagesHistory || [])
      handleSetMessages(remainingMessages)
    } catch (ex) {
      console.error(ex)
      handleSetMessages(flatMessages)
    }
    setInited(true)

    return () => {}
  }, [inited, id, flatMessages, handleSetMessages, setMessages])

  useEffect(() => {
    messages.length && scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
  }, [messages, scrollRef])

  return (
    <Box {...boxProps} flex={1}>
      <CourseHeader title={name} />
      <ScrollContainer ref={scrollRef} px={4} flex={1}>
        {messages && <MessageGroup messages={messages} author={{...author, type: 'AUTHOR'}} />}
      </ScrollContainer>
      <ChatInteraction px={4} buttons={responseOptions} type={currentType} onSelect={onSelectOption} />
    </Box>
  )
}

const ScrollContainer = styled(Box)`
  overflow-y: auto;
`
