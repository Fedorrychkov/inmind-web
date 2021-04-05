import { variant, styleFn } from 'styled-system'
import type { DefaultTheme } from 'styled-components'
import { transparentize } from 'polished'
import type { WithTheme } from '../types'

export const designsArray = ['1000', '900', '800', '700', '600', '500', '400', '300', '200', '100', '0', '-100', '-200', '-300', '-400', '-500', '-600', '-700', '-800', '-900', '-1000', 'inherit'] as const
export type Design = typeof designsArray[number]

export const designs: styleFn = (theme: DefaultTheme): Record<Design, any> => ({
  inherit: {
    color: 'inherit',
  },
  '1000': {
    color: theme.colors.contrast,
  },
  '900': {
    color: transparentize(0.1, theme.colors.contrast),
  },
  '800': {
    color: transparentize(0.2, theme.colors.contrast),
  },
  '700': {
    color: transparentize(0.3, theme.colors.contrast),
  },
  '600': {
    color: transparentize(0.4, theme.colors.contrast),
  },
  '500': {
    color: transparentize(0.5, theme.colors.contrast),
  },
  '400': {
    color: transparentize(0.6, theme.colors.contrast),
  },
  '300': {
    color: transparentize(0.7, theme.colors.contrast),
  },
  '200': {
    color: transparentize(0.8, theme.colors.contrast),
  },
  '100': {
    color: transparentize(0.9, theme.colors.contrast),
  },
  '0': {
    color: 'transparent',
  },
  '-1000': {
    color: theme.colors.base,
  },
  '-900': {
    color: transparentize(0.1, theme.colors.base),
  },
  '-800': {
    color: transparentize(0.2, theme.colors.base),
  },
  '-700': {
    color: transparentize(0.3, theme.colors.base),
  },
  '-600': {
    color: transparentize(0.4, theme.colors.base),
  },
  '-500': {
    color: transparentize(0.5, theme.colors.base),
  },
  '-400': {
    color: transparentize(0.6, theme.colors.base),
  },
  '-300': {
    color: transparentize(0.7, theme.colors.base),
  },
  '-200': {
    color: transparentize(0.8, theme.colors.base),
  },
  '-100': {
    color: transparentize(0.9, theme.colors.base),
  },
})

export const design: styleFn = <T extends object>(props: WithTheme<T>) => variant({
  prop: 'design',
  variants: designs(props.theme),
})

export type DesignProps = {
  design?: Design
}
