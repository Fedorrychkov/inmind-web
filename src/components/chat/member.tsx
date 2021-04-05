import React from 'react'
import { Box } from '~/primitives/box'
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
}

export const Member = ({
  name,
  description,
  width = 72,
  height = 72,
  icon = 'person',
}: Props) => {
  return (
    <Box flexDirection="row" alignItems="center">
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
