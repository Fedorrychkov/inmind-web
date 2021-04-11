import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MESSAGES_HISOTRY_KEY, USER_ANSWERS_KEY } from '~/constants/storage-keys'
import { useWrappedRef } from '~/hooks/use-ref'
import { IMessage } from '~/interfaces/ICourse'
import { Box, BoxProps } from '~/primitives/box'
import { getMessagesFromChapters } from '~/services/courses'
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
  const [userAnswers, setUserAnswers] = useState([])
  const [timerId, setTimerId] = useState(() => setTimeout(() => {}, 0))
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

  const handleSetMessages = useCallback((messages: IMessage[], userAnswers?: any, messagesHistory?: any) => {
    if (!messages.length) return

    if (!(userAnswers.length && messagesHistory.length)) {
      console.log(messages, userAnswers, messagesHistory)
      setTimeout(() => {
        const [message, ...otherMessages] = messages

        setMessages(state => [...state, message])
        handleSetMessages(otherMessages, userAnswers, messagesHistory)
      }, 1000)
    }
  }, [])

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
      <ChatInteraction px={4} />
    </Box>
  )
}

const ScrollContainer = styled(Box)`
  overflow-y: auto;
`
