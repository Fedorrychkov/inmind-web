export const iconTypes = [
  'close',
  'person',
  'author',
  'person-man',
  'send',
] as const

export type IconType = typeof iconTypes[number]
