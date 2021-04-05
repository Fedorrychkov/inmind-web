import React, { PropsWithChildren } from 'react'
import { snowTheme } from '../snow'
import type { InMindTheme } from '../types'
import { ThemeProvider as NativeThemeProvider } from '~/theming/styled'

export type ThemeProviderProps = PropsWithChildren<{
  theme?: InMindTheme
}>

export function ThemeProvider({ theme = snowTheme, children }: ThemeProviderProps) {
  return (
    <NativeThemeProvider theme={theme}>
      {children}
    </NativeThemeProvider>
  )
}