import React from 'react'
import { BaseIcon, BaseIconProps } from './base'

export function Person(props: Omit<BaseIconProps, 'children'>) {
  return (
    <BaseIcon {...props}>
      {({ color, fillOpacity, ...restProps }) => (
        <svg viewBox="0 0 19 20" fill="none" {...restProps}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.49989 0C12.1232 0 14.2499 2.23858 14.2499 5C14.2499 7.76142 12.1232 10 9.49989 10C6.87654 10 4.74989 7.76142 4.74989 5C4.74989 2.23858 6.87654 0 9.49989 0ZM9.5 11.25C12.6706 11.25 19 12.9125 19 16.25V20H0V16.25C0 12.9125 6.32937 11.25 9.5 11.25Z"
            fill={color}/>
        </svg>
      )}
    </BaseIcon>
  )
}
