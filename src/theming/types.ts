export const uiSizes = ['sm', 'md', 'lg'] as const
export type UISize = typeof uiSizes[number]

export type InMindTheme = {
  colors: {
    contrast: string
    base: string
    primary: string
    red: string
    secondary: string
    protocol: string
  }
  space: number[]
  breakpoints: string[] & {
    sm: string
    md: string
    lg: string
    xl: string
  },
  fontSizes: number[]
  transitions: {
    fast: string
    medium: string
    long: string
  },
  uiSizes: Record<UISize, number>
}

export type WithTheme<T extends {}> = T & {
  theme: InMindTheme
}