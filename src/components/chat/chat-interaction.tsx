import React, { useCallback } from 'react'
import { COURSE_INTERACTIONS } from '~/constants/course-interaction-types'
import { Button } from '~/common/button'
import { Box, BoxProps } from '~/primitives/box'
import { styled } from '~/theming/styled'
import { TextInput } from '~/primitives/text-input'
import { Text } from '~/primitives/text'
import { Icon } from '~/primitives/icon'
import { Touchable } from '~/primitives/touchable'
import { IMessageOptions } from '~/interfaces/ICourse'

type Props = {
  onChangeText?: (value: string) => void
  onSelect?: (key: number | string) => void
  onSend?: () => void
  buttons?: IMessageOptions[]
  type?: string
  inputValue?: string
  inputName?: string
} & BoxProps

export const ChatInteraction = ({
  onChangeText = () => {},
  onSelect = () => {},
  onSend = () => {},
  buttons,
  type,
  inputName,
  inputValue,
  ...boxProps
}: Props) => {
  const onChange = useCallback((e) => onChangeText(e.target.value), [onChangeText])

  return (
    <Container {...boxProps}>
      <Box flex={1}>
        {type === COURSE_INTERACTIONS.CHOOSEN && (
          <ButtonsContainer flex={1} flexDirection="row" flexWrap="wrap">
            {buttons && buttons.map(({ id, content, color }) => (
              <SelectButton
                onPress={() => onSelect(id)}
                key={id}
                color="contrast"
                fontSize={14}
                weight="700"
                m="5px"
                {...(color && { style: { backgroundColor: color } })}>{content}</SelectButton>
            ))}
          </ButtonsContainer>
        )}
        {type === COURSE_INTERACTIONS.TEXT_INPUT && (
          <Box as="form" mr={2} onSubmit={onSend}>
            <TextInput
              type="text"
              placeholder="Введи свой ответ"
              value={inputValue}
              name={inputName || 'chat-interaction'}
              onChange={onChange}
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
          <ChatSendButton onClick={onSend}><Icon type="send" color="contrast" width={21} height={21} /></ChatSendButton>
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

const ButtonsContainer = styled(Box)`
  margin: -5px;
`

const SelectButton = styled(Button)`
  padding: 10.5px 30.5px !important;
  width: auto !important;
  background-color: ${p => p.theme.colors.orange};
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
