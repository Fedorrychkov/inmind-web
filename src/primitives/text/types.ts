import type { ColorProps, TextAlignProps } from 'styled-system'
import type { WeightProps } from '~/theming/variants/weight'
import type { SizeProps } from '~/theming/variants/size'
import type { DesignProps } from '~/theming/variants/design'
import type { TransitionProps } from '~/theming/variants/transition'
import type { InMindTheme } from '~/theming/types'
import type { WebStyledComponent, WebStyledComponentProps } from '~/domain'

export type TextEnhancedProps = {
  oneLine?: boolean
}


export const virtualTextProps = ['fontSize'] as const
export type VirtualTextProp = typeof virtualTextProps[number]
export type VirtualTextProps = {
  fontSize?: string | number | string[] | number[]
}

export type TextSharedProps =
	& ColorProps<InMindTheme>
	& TextAlignProps<InMindTheme>
	& WeightProps
	& DesignProps
	& TransitionProps
	& SizeProps
	& TextEnhancedProps
	& VirtualTextProps

export type TextWebComponent = WebStyledComponent<keyof JSX.IntrinsicElements, TextSharedProps>
export type TextWebProps = WebStyledComponentProps<keyof JSX.IntrinsicElements, TextSharedProps>
