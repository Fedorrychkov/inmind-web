import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChatInteraction } from '../chat/chat-interaction'
import { MessageGroup } from '../chat/message-group'
import { CourseHeader } from './header'
import { useWrappedRef } from '~/hooks/use-ref'
import { IMessage, ITestResult } from '~/interfaces/ICourse'
import { Box, BoxProps } from '~/primitives/box'
import {
  UserAnswer,
  getCourseAnswers,
  getCourseHistory,
  getCurrentTestByHistory,
  getCurrentTestByMessage,
  getCurrentTestValue,
  getMessagesFromChapters,
  getRemainingMessages,
  setCourseAnswers,
  setCourseHistoriesByCourse,
} from '~/services/courses'
import { COURSE_INTERACTIONS } from '~/constants/course-interaction-types'
import { styled } from '~/theming/styled'
import { ITestQuestion } from '~/interfaces/ICourse'
import { hasInterpolationTemplate, getInterpolatedString } from '~/helpers/string'

const getVariablesFromAnswers = (userAnswers: UserAnswer[]) => Object.fromEntries(
  userAnswers.filter(answer => !!answer.variable).map(answer => [answer.variable as string, answer.value]),
)

type Props = {
  course: any
} & BoxProps

export const CourseInner = ({ course, ...boxProps }: Props) => {
  const { name, author, id } = course
  const scrollRef = useWrappedRef()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [currentType, setCurrentType] = useState('')
  const [textInputValue, setTextInput] = useState('')
  const [textInputName, setTextInputName] = useState('')
  const [awaitedMessages, setAwaitedMessages] = useState<IMessage[]>([])
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [responseOptions, setResponseOptions] = useState([])
  const [currentTestResults, setCurrentTestResults] = useState<ITestResult[] | undefined>([])
  const [currentTestValue, setCurrentTestValue] = useState(0)
  const [currentTestId, setCurrentTestId] = useState('')
  const [inited, setInited] = useState(false)

  const flatMessages = useMemo(() => {
    const flattedMessages = getMessagesFromChapters(course.chapters)

    return flattedMessages
  }, [course])

  const interpolationVariables = useMemo(() => getVariablesFromAnswers(userAnswers), [userAnswers])

  const handleShowAnswerQuestions = useCallback((message, cb = () => {}, otherMessages: IMessage[]) => {
    if (![COURSE_INTERACTIONS.CHOOSEN, COURSE_INTERACTIONS.TEXT_INPUT].includes(message.type)) {
      return cb()
    }

    setCurrentType(message.type)
    setAwaitedMessages(otherMessages)
    message.type === COURSE_INTERACTIONS.CHOOSEN && setResponseOptions(message.options)
    message.type === COURSE_INTERACTIONS.TEXT_INPUT && setTextInput('')
    message.type === COURSE_INTERACTIONS.TEXT_INPUT && message.variable && setTextInputName(message.variable)
  }, [setCurrentType, setAwaitedMessages, setResponseOptions])

  const currentResultMessage = useMemo(() => {
    const result = currentTestResults?.find((result) => {
      const { min, max } = result.count

      if ((min !== undefined ? currentTestValue > min : true) && (max !== undefined ? currentTestValue <= max : true)) {
        return result
      }

      return false
    })

    if (!result) {
      return undefined
    }

    const { type, content, options, messages } = result

    return { id: `${currentTestId}-result`, isResult: true, type, content, options, messages }
  }, [currentTestId, currentTestValue, currentTestResults])

  const prepareGetCourseResultOrMessage = useCallback((nextMessages, beforeNextMessages) => {
    const [message] = nextMessages
    const lastMessages = beforeNextMessages ? beforeNextMessages.filter((message: IMessage) => message.author !== 'ME') : undefined
    const lastMessage = lastMessages ? lastMessages[lastMessages.length - 1] : undefined

    const messagesFromResult = currentResultMessage ?
      [currentResultMessage, ...currentResultMessage.messages] : []

    if (lastMessage && lastMessage.testId && !message.testId) {
      return currentResultMessage ? [...messagesFromResult, ...nextMessages] : nextMessages
    }

    return nextMessages
  }, [currentResultMessage])

  const interpolateCurrentMessage = useCallback((message, answers: UserAnswer[] = []) => {
    const { content } = message
    const hasInterpolation = hasInterpolationTemplate(content)

    if (!hasInterpolation) {
      return message
    }

    const variables = answers.length ? getVariablesFromAnswers(answers) : interpolationVariables
    const interpolatedStr = getInterpolatedString(content, variables)

    return {
      ...message,
      content: interpolatedStr,
    }
  }, [interpolationVariables])

  const handleSetMessages = useCallback((
    currMessages: IMessage[],
    beforeNextMessages: IMessage[] = [],
    answers: UserAnswer[] = [],
  ) => {
    if (!currMessages.length) {
      return
    }

    setTimeout(() => {
      const [message, ...otherMessages] = currMessages
      const [currentMessage, ...someNextMessages] =
        prepareGetCourseResultOrMessage([message, ...otherMessages], beforeNextMessages)
      const interpolatedMessage = interpolateCurrentMessage(currentMessage, answers)

      setMessages(state => {
        setCourseHistoriesByCourse(course, [...state, interpolatedMessage])

        if (interpolatedMessage.testId && !currentTestId) {
          const currentTest = getCurrentTestByMessage(flatMessages, interpolatedMessage)
          currentTest && setCurrentTestId(currentTest.id)
          currentTest && setCurrentTestResults(currentTest.results)
        }

        if (interpolatedMessage.isResult) {
          setCurrentTestValue(0)
          setCurrentTestId('')
          setCurrentTestResults([])
        }

        return [...state, interpolatedMessage]
      })
      handleShowAnswerQuestions(
        interpolatedMessage,
        () => handleSetMessages(someNextMessages, [...beforeNextMessages, interpolatedMessage], answers),
        someNextMessages,
      )
    }, 1000)
  }, [
    course,
    currentTestId,
    flatMessages,
    handleShowAnswerQuestions,
    setMessages,
    setCurrentTestResults,
    prepareGetCourseResultOrMessage,
    interpolateCurrentMessage,
  ])

  const handleCheckCurrentTest = useCallback((flatMessages: IMessage[], messagesHistory: IMessage[], userAnswers) => {
    const currentTest = getCurrentTestByHistory(flatMessages, messagesHistory)

    if (!currentTest || currentTest.type !== 'TEST') {
      return
    }

    const currentTestValue = getCurrentTestValue(currentTest, userAnswers)

    setCurrentTestId(currentTest.id)
    setCurrentTestResults(currentTest.results)
    setCurrentTestValue(currentTestValue)
  }, [])

  const onSelectOption = useCallback((optionId) => {
    const selectedOption: IMessage | any = responseOptions.find(({ id }) => id === optionId)
    const lastMessage = messages[messages.length - 1]
    const hasSelectedAnswer = Boolean(selectedOption)

    selectedOption && setMessages(state => [...state, { type: 'TEXT', author: 'ME', ...selectedOption }])
    selectedOption && setResponseOptions([])
    selectedOption && setCurrentType('')

    if (hasSelectedAnswer) {
      const count = (selectedOption as ITestQuestion).count
      const testId = (lastMessage as ITestQuestion & { testId: string }).testId
      const payload: UserAnswer = { id: selectedOption.id, messageId: `${lastMessage.id}`, count, testId }

      testId && count && setCurrentTestValue(state => state + count)
      setCourseAnswers(id, payload)
      setUserAnswers(state => [...state, payload])
    }

    // TODO: Условие нужно сделать более простым и очевидным, подправить типы,
    // TODO: чтобы можно было разбить его без лишних упоминаний type choosen?
    const isMessageExpectingCorrectAnswer = hasSelectedAnswer &&
      lastMessage.type === 'CHOOSEN' &&
      typeof lastMessage.correctAnswer !== 'undefined' &&
      lastMessage.incorrectAnswerType === 'REPEAT' &&
      lastMessage.correctAnswer !== selectedOption.id

    if (isMessageExpectingCorrectAnswer) {
      const payload = [
        ...(selectedOption.messages || []),
        lastMessage,
        ...awaitedMessages,
      ]

      handleSetMessages(payload, messages)
      return
    }

    if (selectedOption && selectedOption.messages && selectedOption.messages.length) {
      const payload = [
        ...(selectedOption.messages || []),
        ...awaitedMessages,
      ]

      handleSetMessages(payload, messages)
      return
    }

    if (selectedOption && selectedOption?.questions?.length) {
      const payload = [
        ...selectedOption.questions,
        ...awaitedMessages,
      ]

      handleSetMessages(payload, messages)
      return
    }

    selectedOption && handleSetMessages(awaitedMessages, messages)
  }, [id, awaitedMessages, responseOptions, messages, handleSetMessages, setMessages])

  const onSend = useCallback(() => {
    if (!textInputName) {
      return
    }

    const lastMessage = messages[messages.length - 1]
    const payload: UserAnswer = {
      id: `${lastMessage.id}-input`,
      messageId: `${lastMessage.id}`,
      value: textInputValue,
      variable: textInputName,
    }

    setMessages(state => [...state, { type: 'TEXT', author: 'ME', content: textInputValue }])
    setCurrentType('')
    setTextInputName('')
    setCourseAnswers(id, payload)
    setUserAnswers([...userAnswers, payload])
    handleSetMessages(awaitedMessages, messages, [...userAnswers, payload])
  }, [textInputName, awaitedMessages, textInputValue, id, messages, userAnswers, handleSetMessages])

  useEffect(() => {
    if (inited) return () => {}
    const answers = getCourseAnswers(id)
    const { messagesHistory } = getCourseHistory(id)

    try {
      answers && setUserAnswers(answers || [])
      const remainingMessages = getRemainingMessages(flatMessages, messagesHistory || [])

      handleCheckCurrentTest(flatMessages, messagesHistory || [], answers || [])
      setMessages(messagesHistory || [])
      handleSetMessages(remainingMessages, messagesHistory || [], answers || [])
    } catch (ex) {
      console.error(ex)
      handleSetMessages(flatMessages, [], [])
    }

    setInited(true)

    return () => {}
  }, [inited, id, flatMessages, handleSetMessages, setMessages, handleCheckCurrentTest])

  useEffect(() => {
    messages.length && scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
  }, [messages, scrollRef])

  return (
    <Box {...boxProps} flex={1}>
      <CourseHeader title={name} />
      <ScrollContainer ref={scrollRef} px={4} flex={1}>
        {messages && <MessageGroup messages={messages} author={{...author, type: 'AUTHOR'}} />}
      </ScrollContainer>
      <ChatInteraction
        px={4}
        buttons={responseOptions}
        type={currentType}
        onSelect={onSelectOption}
        inputValue={textInputValue}
        inputName={textInputName}
        onChangeText={setTextInput}
        onSend={onSend}
      />
    </Box>
  )
}

const ScrollContainer = styled(Box)`
  overflow-y: auto;
`
