import { variant, styleFn } from 'styled-system'
import type { WithTheme, InMindTheme } from '../types'

export const transitionsArray = ['fast', 'medium', 'long'] as const
export type Transition = typeof transitionsArray[number]

export const transitions: styleFn = (theme: InMindTheme): Record<Transition, any> => ({
  fast: theme.transitions.fast,
  medium: theme.transitions.medium,
  long: theme.transitions.long,
})

export const transition: styleFn = <T extends object>(p: WithTheme<T>) => variant({
  prop: 'transition',
  variants: transitions(p.theme),
})

export type TransitionProps = {
  transition?: Transition
}