import React from 'react'
import { DefaultTheme } from 'styled-components'
import { ThemeProvider as WebThemeProvider } from 'styled-components'
import { PropsWithChildren } from 'react'
import { snowTheme } from '../snow'

export type ThemeProviderProps = PropsWithChildren<{
  theme?: DefaultTheme
}>

export function ThemeProvider({ theme = snowTheme, children }: ThemeProviderProps) {
  return (
    <WebThemeProvider theme={theme}>
      {children}
    </WebThemeProvider>
  )
}
