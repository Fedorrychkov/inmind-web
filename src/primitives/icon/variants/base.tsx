import React from 'react'
import { SvgIconProps } from '@material-ui/core'
import { useTheme } from '~/theming/styled'
import type { InMindColor } from '~/theming/types'

export type BaseIconProps = Omit<SvgIconProps, 'color'> & {
  children: (
    props: Omit<SvgIconProps, 'width' | 'height' | 'color'> & {
      width: string | number
      height: string | number
      color: string
    }
  ) => React.ReactElement
  color?: keyof InMindColor | string
}

export function BaseIcon({ width = 16, height = 16, color = 'contrast', children, ...restProps }: BaseIconProps) {
  const theme = useTheme()
  return children({
    width,
    height,
    color: color in theme.colors ? theme.colors[color as keyof InMindColor] : color,
    ...restProps,
  })
}
