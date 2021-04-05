export const iconTypes = [
  'close',
  'person',
  'author',
] as const

export type IconType = typeof iconTypes[number]
