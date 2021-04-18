import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MESSAGES_HISOTRY_KEY, USER_ANSWERS_KEY } from '~/constants/storage-keys'
import { useWrappedRef } from '~/hooks/use-ref'
import { IMessage } from '~/interfaces/ICourse'
import { Box, BoxProps } from '~/primitives/box'
import { getMessagesFromChapters } from '~/services/courses'
import { COURSE_INTERACTIONS } from '~/constants/course-interaction-types'
import { styled } from '~/theming/styled'
import { ChatInteraction } from '../chat/chat-interaction'
import { MessageGroup } from '../chat/message-group'
import { CourseHeader } from './header'

type Props = {
  course: any
} & BoxProps

export const CourseInner = ({ course, ...boxProps }: Props) => {
  const { name, author } = course
  const scrollRef = useWrappedRef()
  const [messages, setMessages] = useState<IMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState<IMessage | any>({})
  const [userAnswers, setUserAnswers] = useState([])
  const [currentType, setCurrentType] = useState('')
  const [awaitedMessages, setAwaitedMessages] = useState<IMessage[]>([])
  const [responseOptions, setRespnseOptions] = useState([])
  const [messagesHistory, setMessagesHistory] = useState([])

  useEffect(() => {
    const answers = localStorage.getItem(USER_ANSWERS_KEY)
    const history = localStorage.getItem(MESSAGES_HISOTRY_KEY)

    try {
      answers && setUserAnswers(JSON.parse(answers))
      history && setMessagesHistory(JSON.parse(history))
    } catch (ex) {
      console.error(ex)
    }
  }, [])

  const flatMessages = useMemo(() => {
    const flattedMessages = getMessagesFromChapters(course.chapters)

    return flattedMessages
  }, [course])

  const handleShowAnswerQuestions = useCallback((message, cb = () => {}, otherMessages: IMessage[]) => {
    if (![COURSE_INTERACTIONS.CHOOSEN, COURSE_INTERACTIONS.TEXT_INPUT].includes(message.type)) {
      return cb()
    }

    setCurrentType(message.type)
    setCurrentMessage(message)
    setAwaitedMessages(otherMessages)
    message.type === COURSE_INTERACTIONS.CHOOSEN && setRespnseOptions(message.options)
  }, [setCurrentType, setAwaitedMessages, setCurrentMessage, setRespnseOptions])

  const handleSetMessages = useCallback((
    messages: IMessage[],
    userAnswers: any[] = [],
    messagesHistory: any[] = [],
  ) => {
    if (!messages.length) return

    if (!(userAnswers.length && messagesHistory.length)) {
      console.log(messages, userAnswers, messagesHistory)
      setTimeout(() => {
        const [message, ...otherMessages] = messages

        setMessages(state => [...state, message])
        handleShowAnswerQuestions(message, () => handleSetMessages(otherMessages), otherMessages)
      }, 1000)
    }
  }, [handleShowAnswerQuestions, setMessages])

  const onSelectOption = useCallback((optionId) => {
    const selectedOption: IMessage | any = responseOptions.find(({ id }) => id === optionId)

    selectedOption && setMessages(state => [...state, { type: 'TEXT', author: 'ME', ...selectedOption }])
    selectedOption && setRespnseOptions([])
    selectedOption && setCurrentType('')

    if (selectedOption && selectedOption.messages && selectedOption.messages.length) {
      const payload = [
        ...selectedOption.messages,
        ...awaitedMessages,
      ]

      handleSetMessages(payload)
      return
    }

    selectedOption && handleSetMessages(awaitedMessages)
  }, [awaitedMessages, handleSetMessages, setMessages, responseOptions])

  useEffect(() => {
    handleSetMessages(flatMessages, userAnswers || [], messagesHistory || [])
  }, [flatMessages, userAnswers, messagesHistory, handleSetMessages])

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
