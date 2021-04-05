import 'styled-components'
import type { InMindTheme } from './types'

declare module 'styled-components' {
  export interface DefaultTheme extends InMindTheme {}
}
