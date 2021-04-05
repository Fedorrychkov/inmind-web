import React from 'react'
import { Box, BoxProps } from '~/primitives/box'

type Props = {

} & BoxProps

export const ChatInner = ({ ...boxProps }: Props) => {
  return (
    <Box {...boxProps}>

    </Box>
  )
}
