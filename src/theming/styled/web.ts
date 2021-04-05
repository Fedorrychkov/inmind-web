import * as SC from 'styled-components'
import type { InMindTheme } from '../types'

const {
  default: styled,
  css,
  ThemeProvider,
  keyframes,
  useTheme,
} = SC as SC.ThemedStyledComponentsModule<InMindTheme>

export { useTheme, keyframes, styled, css, ThemeProvider }