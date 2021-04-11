import React from 'react'
import { BaseIcon, BaseIconProps } from './base'

export function Send(props: Omit<BaseIconProps, 'children'>) {
  return (
    <BaseIcon {...props}>
      {({ color, fillOpacity, ...restProps }) => (
        <svg viewBox="0 0 21 21" fill="none" {...restProps}>
          <path d="M19.25 1.75L9.625 11.375" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.25 1.75L13.125 19.25L9.625 11.375L1.75 7.875L19.25 1.75Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </BaseIcon>
  )
}
