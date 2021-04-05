import React from 'react'
import { Box, BoxProps } from '~/primitives/box'

export type SafeZoneProps = BoxProps

export function SafeZone(props: SafeZoneProps) {
  return <Box px={40} {...props} />
}
