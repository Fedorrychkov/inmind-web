import React, { useCallback, useMemo, useState } from 'react'
import { CustomModal } from '~/common/modal'
import { IAuthor, IMessage } from '~/interfaces/ICourse'
import { Box } from '~/primitives/box'
import { Icon } from '~/primitives/icon'
import { Text } from '~/primitives/text'
import { Touchable } from '~/primitives/touchable'
import { styled } from '~/theming/styled'

type Props = {
  messages: IMessage[] | any
  author?: IAuthor & { type: 'AUTHOR' | 'PERSON' | 'ME' }
}

type messageGroup = {
  messages: IMessage[] | any
  authorType: 'AUTHOR' | 'PERSON' | 'ME'
}

export const MessageGroup = ({
  messages,
}: Props) => {
  const messageGroups = useMemo(() => {
    return messages.reduce((groups: messageGroup[], message: IMessage | any) => {
      const lastGroup = groups[groups.length - 1]
      const messageAuthorType = message.author || 'AUTHOR'

      if (!groups.length) {
        return [
          {
            authorType: messageAuthorType,
            messages: [message],
          },
        ]
      }

      if (lastGroup && messageAuthorType !== lastGroup.authorType) {
        return [
          ...groups,
          {
            authorType: messageAuthorType,
            messages: [message],
          },
        ]
      }

      const parsedGroups = groups.map((group, index) => {
        if (index === groups.length - 1) {
          const messages = [
            ...group.messages,
            message,
          ]

          return {
            ...group,
            messages,
          }
        }

        return group
      })

      return parsedGroups
    }, [])
  }, [messages])

  return (
    <>
      {messageGroups.map(({ messages, authorType }: messageGroup, index: number) => (
        <Box
          key={index}
          flexDirection={authorType === 'ME' ? 'row-reverse' : 'row'}
          alignItems="flex-end"
        >
          <AvatarContainer
            position="sticky"
            bottom={11}
            ml={authorType === 'ME' ? 11 : 0}
            mb={11}
            mr={authorType === 'ME' ? 0 : 14}
          >
            <Icon type={authorType === 'ME' ? 'person-man' : 'author'} width={58} height={58} />
          </AvatarContainer>
          <Box flex={1}
            display="flex"
            alignItems={authorType === 'ME' ? 'flex-end' : 'flex-start'}
          >
            {messages.map((message: IMessage, index: number) => (
              <Message key={message.id !== undefined ? message.id : index} message={message} authorType={authorType} />
            ))}
          </Box>
        </Box>
      ))}
    </>
  )
}

export const Message = ({
  message,
}: { message: IMessage, authorType: string }) => {
  const { content, type, color } = message
  const [modalIsOpen, setIsOpen] = useState(false)

  const closeModal = useCallback(() => setIsOpen(false), [])
  const openModal = useCallback(() => setIsOpen(true), [])

  const renderMessage = useMemo(() => {
    switch (type) {
      case 'IMG_URL':
        return (
          <Touchable onClick={openModal}>
            <Img src={content} alt=""/>
          </Touchable>
        )
      default:
        return (
          <Text fontSize={16} weight="medium">
            {content}
          </Text>
        )
    }
  }, [content, type, openModal])

  const renderModalContent = useMemo(() => {
    switch (type) {
      // TODO: Добавить видео, думаю его проигрывание будет в попапе,
      // TODO: ниже уже есть все для попапа, необходимо сделать вывод превью видео и
      // TODO: проверить работоспособность обновив в курсе IMG_URL на VIDEO_URL, если все ок вернуть IMG URL
      case 'IMG_URL':
        return (
          <Box>
            <Img src={content} alt="" />
          </Box>
        )
      default:
        return null
    }
  }, [content, type])

  const hasModal = useMemo(() => {
    switch (type) {
      case 'IMG_URL':
      case 'VIDEO_URL':
        return true
      default:
        return false
    }
  }, [type])

  return (
    <MessageContainer {...(color && { style: { backgroundColor: color } })}>
      {renderMessage}
      {hasModal && (
        <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
          {renderModalContent}
        </CustomModal>
      )}
    </MessageContainer>
  )
}

const AvatarContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 58px;
  height: 58px;
  overflow: hidden;
`

const Img = styled.img`
  width: 100%;
`

const MessageContainer = styled(Box)`
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.common};
  border-radius: 6px;
  padding: 12px 20px;
  margin: 11px 0;
  min-height: 58px;
  display: flex;
  justify-content: center;
  white-space: pre-wrap;
  width: fit-content;
`
