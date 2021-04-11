import React from 'react'
import { COURSE_INTERACTIONS } from '~/constants/course-interaction-types'
import { Button } from '~/common/button'
import { Box, BoxProps } from '~/primitives/box'
import { styled } from '~/theming/styled'
import { TextInput } from '~/primitives/text-input'
import { Text } from '~/primitives/text'
import { Icon } from '~/primitives/icon'
import { Touchable } from '~/primitives/touchable'

type Buttons = {
  key: string
  text: string
  color?: string
}

type Props = {
  onChangeText?: (value: string) => void
  onSelect?: (key: string) => void
  onSend?: () => void
  buttons?: Buttons[]
  type?: string
} & BoxProps

export const ChatInteraction = ({
  onChangeText = () => {},
  onSelect = () => {},
  onSend = () => {},
  buttons,
  type,
  ...boxProps
}: Props) => {
  return (
    <Container {...boxProps}>
      <Box flex={1}>
        {type === COURSE_INTERACTIONS.CHOOSEN && (
          <>
            {buttons && buttons.map(({ key, text, color }) => (
              <SelectButton
                onPress={() => onSelect(key)}
                key={key}
                color="contrast"
                {...(color && { style: { backgroundColor: color } })}>{text}</SelectButton>
            ))}
          </>
        )}
        {type === COURSE_INTERACTIONS.TEXT_INPUT && (
          <Box>
            <TextInput
            />
          </Box>
        )}
        {![COURSE_INTERACTIONS.CHOOSEN, COURSE_INTERACTIONS.TEXT_INPUT].includes(type || '') && (
          <Box>
            <Text fontSize={14} weight="bold" color="commonBolder">Тут будут ваши варианты ответов</Text>
          </Box>
        )}
      </Box>
      <Box>
        {type === COURSE_INTERACTIONS.TEXT_INPUT ? (
          <ChatSendButton><Icon type="send" color="contrast" width={21} height={21} /></ChatSendButton>
        ) : (
          <AvatarContainer><Icon type="person-man" width={38} height={38} /></AvatarContainer>
        )}
      </Box>
    </Container>
  )
}

const Container = styled(Box)`
  padding: 24px 32px;
  background-color: ${p => p.theme.colors.thinBackground};
  min-height: 86px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const SelectButton = styled(Button)`
  padding: 10.5px 30.5px;
`

const ChatSendButton = styled(Touchable)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${p => p.theme.colors.orange};
`

const AvatarContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  overflow: hidden;
`
