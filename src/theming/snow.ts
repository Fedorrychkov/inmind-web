import { transparentize } from 'polished'
import { InMindTheme } from './types'

const breakpoints = ['578px', '768px', '981px', '1366px'] as string[] & {
  sm: string
  md: string
  lg: string
  xl: string
}

breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const fontSizes = [12, 14, 16, 18, 20, 24, 28, 36]

const absoluteColors = {
  contrast: 'rgba(36, 36, 36, 1)',
  black: 'rgba(0, 0, 0, 1)',
  base: 'rgba(255, 253, 249, 1)',
  white: 'rgba(255, 255, 255, 1)',
  primary: 'rgba(19, 78, 228, 1)',
  red: 'rgba(255, 87, 87, 1)',
  secondary: 'rgba(254, 218, 3, 1)',
  protocol: 'rgba(0, 163, 255, 1)',
}

const calculatedColors = {
  border: transparentize(0.9, absoluteColors.contrast),
  'base-280': transparentize(0.72, absoluteColors.base),
  'base-400': transparentize(0.6, absoluteColors.base),
  'base-500': transparentize(0.5, absoluteColors.base),
  'base-600': transparentize(0.4, absoluteColors.base),
  'contrast-900': transparentize(0.1, absoluteColors.contrast),
  'contrast-700': transparentize(0.3, absoluteColors.contrast),
  'contrast-500': transparentize(0.5, absoluteColors.contrast),
  'contrast-400': transparentize(0.6, absoluteColors.contrast),
  'contrast-003': transparentize(0.97, absoluteColors.contrast),
  'contrast-100': transparentize(0.9, absoluteColors.contrast),
}

export const snowTheme: InMindTheme = {
  colors: {
    ...absoluteColors,
    ...calculatedColors,
  },
  space: [0, 4, 8, 16, 32, 64, 128],
  fontSizes,
  transitions: {
    fast: '0.12s all ease-in-out',
    medium: '0.12s all ease-in-out',
    long: '0.12s all ease-in-out',
  },
  uiSizes: {
    sm: 40,
    md: 48,
    lg: 56,
  },
}
