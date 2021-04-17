import React from 'react'
import { Text } from '~/primitives/text'
import { Touchable, TouchableProps } from '~/primitives/touchable'
import { styled } from '~/theming/styled'
import { SizeProps } from '~/theming/variants/size'
import { WeightProps } from '~/theming/variants/weight'

type Props = {
  onPress: () => void
  color?: any
  children: React.ReactNode
} & TouchableProps & SizeProps & WeightProps

export const Button = ({
  onPress = () => {},
  color,
  children,
  fontSize = 22,
  lineHeight = 0.9,
  weight,
  ...touchableProps
}: Props) => (
  <Pressable onClick={onPress} {...touchableProps}>
    <Text color={color || 'white'} fontSize={fontSize} lineHeight={lineHeight} weight={weight}>{children}</Text>
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
