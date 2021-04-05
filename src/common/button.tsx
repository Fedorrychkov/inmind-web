import React from 'react'
import { Text } from '~/primitives/text'
import { Touchable } from '~/primitives/touchable'
import { styled } from '~/theming/styled'

type Props = {
  onPress: () => void
  color?: any
  children: React.ReactNode
}

export const Button = ({
  onPress = () => {},
  color,
  children,
}: Props) => (
  <Pressable onClick={onPress}>
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
