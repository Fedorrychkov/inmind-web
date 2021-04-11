export const uiSizes = ['sm', 'md', 'lg'] as const
export type UISize = typeof uiSizes[number]

export type InMindAbsoluteColor = {
  contrast: string
  black: string
  base: string
  white: string
  primary: string
  red: string
  secondary: string
  protocol: string
  thinBackground: string
  orange: string
  brown: string
  blue: string
  green: string
  pink: string
  common: string
  commonBolder: string
}

export type InMindCalculatedColor = {
  'base-280': string
  'base-400': string
  'base-500': string
  'base-600': string
  'contrast-900': string
  'contrast-700': string
  'contrast-500': string
  'contrast-400': string
  'contrast-100': string
  'contrast-003': string
  border: string
}

export type InMindColor = InMindAbsoluteColor & InMindCalculatedColor

export type InMindTheme = {
  colors: InMindColor
  space: number[]
  fontSizes: number[]
  transitions: {
    fast: string
    medium: string
    long: string
  }
  uiSizes: Record<UISize, number>
}

export type WithTheme<T extends {}> = T & {
  theme: InMindTheme
}
