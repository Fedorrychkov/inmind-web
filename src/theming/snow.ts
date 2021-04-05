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

export const snowTheme: InMindTheme = {
  colors: {
    contrast: 'rgba(0, 0, 0, 1)',
    base: 'rgba(255, 255, 255, 1)',
    primary: 'rgba(0, 102, 255, 1)',
    red: 'rgba(255, 87, 87, 1)',
    secondary: 'rgba(254, 218, 3, 1)',
    protocol: 'rgba(0, 163, 255, 1)',
  },
  space: [0, 4, 8, 16, 32, 64, 128],
  breakpoints,
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
