import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChatInteraction } from '../chat/chat-interaction'
import { MessageGroup } from '../chat/message-group'
import { CourseHeader } from './header'
import { useWrappedRef } from '~/hooks/use-ref'
import { IMessage } from '~/interfaces/ICourse'
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
  const [responseOptions, setRespnseOptions] = useState([])
  const [messagesHistory, setMessagesHistory] = useState([])

  const handleShowAnswerQuestions = useCallback((message, cb = () => {}, otherMessages: IMessage[]) => {
    if (![COURSE_INTERACTIONS.CHOOSEN, COURSE_INTERACTIONS.TEXT_INPUT].includes(message.type)) {
      return cb()
    }

    setCurrentType(message.type)
    setCurrentMessage(message)
    setAwaitedMessages(otherMessages)
    message.type === COURSE_INTERACTIONS.CHOOSEN && setRespnseOptions(message.options)
  }, [setCurrentType, setAwaitedMessages, setCurrentMessage, setRespnseOptions])

  const handleSetMessages = useCallback((currMessages: IMessage[]) => {
    if (!currMessages.length) return

    setTimeout(() => {
      const [message, ...otherMessages] = currMessages
      console.log(message)

      if (message.type === 'TEST') {
        const { questions } = message
        const [question, ...otherQuestions] = questions || []
        const computedMessages = [...otherQuestions, ...otherMessages]

        setMessages(state => {
          setCourseHistoriesByCourse(course, [...state, question])

          return [...state, question]
        })
        handleShowAnswerQuestions(question, () => handleSetMessages(computedMessages), computedMessages)
      } else {
        setMessages(state => {
          setCourseHistoriesByCourse(course, [...state, message])

          return [...state, message]
        })
        handleShowAnswerQuestions(message, () => handleSetMessages(otherMessages), otherMessages)
      }
    }, 1000)
  }, [handleShowAnswerQuestions, setMessages, course])

  const onSelectOption = useCallback((optionId) => {
    const selectedOption: IMessage | any = responseOptions.find(({ id }) => id === optionId)

    selectedOption && setMessages(state => [...state, { type: 'TEXT', author: 'ME', ...selectedOption }])
    selectedOption && setRespnseOptions([])
    selectedOption && setCurrentType('')

    if (selectedOption) {
      const lastMessage = messages[messages.length - 1]
      const count = (lastMessage as ITestQuestion).count

      setCourseAnswers(id, { id: selectedOption.id, messageId: lastMessage.id, count })
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
  }, [id, flatMessages, handleSetMessages, setMessages])

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
