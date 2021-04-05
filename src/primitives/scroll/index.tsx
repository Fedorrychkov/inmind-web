import React, { ComponentProps, HTMLProps } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

export type ScrollProps = Omit<ComponentProps<typeof Scrollbars>, 'key'> & {
  containerProps?: HTMLProps<HTMLDivElement>
}

export function Scroll({ containerProps = {}, ...rest }: ScrollProps) {
  return (
    <Scrollbars
      autoHide
      hideTracksWhenNotNeeded
      {...rest}
      renderView={({ style, ...props }) => (
        <div
          {...props}
          {...containerProps}
          style={{
            ...style,
            ...(containerProps.style || {}),
          }}
        />
      )}
    />
  )
}