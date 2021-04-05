import { iconTypes } from '../types'

export function isIconType(test: any) {
  return iconTypes.indexOf(test) !== -1
}
