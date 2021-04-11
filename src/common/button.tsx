import React from 'react'
import { Text } from '~/primitives/text'
import { Touchable, TouchableProps } from '~/primitives/touchable'
import { styled } from '~/theming/styled'

type Props = {
  onPress: () => void
  color?: any
  children: React.ReactNode
} & TouchableProps

export const Button = ({
  onPress = () => {},
  color,
  children,
  ...touchableProps
}: Props) => (
  <Pressable onClick={onPress} {...touchableProps}>
    <Text color={color || 'white'} fontSize={22} lineHeight={0.9}>{children}</Text>
  </Pressable>
)

const Pressable = styled(Touchable)`
  width: 100%;
  padding: 18.5px;
  background: ${p => p.theme.colors.primary};
  border-radius: 6px;
  transition: 0.15s;

  &:hover {
    opacity: 0.8;
  }
`
