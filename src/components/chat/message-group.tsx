import React, { useMemo } from 'react'
import { IAuthor, IMessage } from '~/interfaces/ICourse'
import { Box } from '~/primitives/box'
import { Icon } from '~/primitives/icon'
import { Text } from '~/primitives/text'
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
        <Box key={index} flexDirection={authorType === 'AUTHOR' ? 'row' : 'row-reverse'} alignItems="flex-end">
          <AvatarContainer
            position="sticky"
            bottom={11}
            ml={authorType === 'ME' ? 11 : 0}
            mb={11}
            mr={authorType === 'ME' ? 0 : 14}
          >
            <Icon type={authorType === 'AUTHOR' ? 'author' : 'person-man'} width={58} height={58} />
          </AvatarContainer>
          <Box>
            {messages.map((message: IMessage) => <Message key={message.id} message={message} />)}
          </Box>
        </Box>
      ))}
    </>
  )
}

export const Message = ({
  message,
}: { message: IMessage }) => {
  const { content, color } = message

  return (
    <MessageContainer {...(color && { style: { backgroundColor: color } })}>
      <Text fontSize={16} weight="medium">
        {content}
      </Text>
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

const MessageContainer = styled(Box)`
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.common};
  border-radius: 6px;
  padding: 12px 20px;
  margin: 11px 0;
  min-height: 58px;
  display: flex;
  justify-content: center;
`
