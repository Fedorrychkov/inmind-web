import React, { createElement } from 'react'
import type { IconType } from './types'
import type { BaseIconProps } from './variants/base'
import { Close } from './variants/close'
import { Person } from './variants/person'
import { Author } from './variants/author'
import { PersonMan } from './variants/person-man'
import { Send } from './variants/send'

export type IconProps = Omit<BaseIconProps, 'type' | 'children'> & {
  type: IconType
}

const iconMap: Record<IconType, React.ComponentType<Omit<IconProps, 'type'>>> = {
  close: Close,
  'person': Person,
  'author': Author,
  'person-man': PersonMan,
  'send': Send,
}

export function Icon({ type, ...restProps }: IconProps) {
  return createElement(iconMap[type], restProps)
}
