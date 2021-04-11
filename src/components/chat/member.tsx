import React from 'react'
import { Box, BoxProps } from '~/primitives/box'
import { Icon } from '~/primitives/icon'
import { IconType } from '~/primitives/icon/types'
import { Text } from '~/primitives/text'
import { styled } from '~/theming/styled'

type Props = {
  name: string,
  description: string,
  width?: string | number
  height?: string | number
  icon?: IconType
} & BoxProps

export const Member = ({
  name,
  description,
  width = 72,
  height = 72,
  icon = 'person',
  ...boxProps
}: Props) => {
  return (
    <Box flexDirection="row" alignItems="center" {...boxProps}>
      <Avatar>
        <Icon width={width} height={height} type={icon} />
      </Avatar>
      {(name || description) && (
        <Box ml={3}>
          {name && <Text fontSize={16} weight="bold">{name}</Text>}
          {description && <Text fontSize={16}>{description}</Text>}
        </Box>
      )}
    </Box>
  )
}

const Avatar = styled(Box)`
  width: 72px;
  height: 72px;
`
