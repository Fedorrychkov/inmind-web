import type { FlexboxProps, LayoutProps, PositionProps, SpaceProps } from 'styled-system'
import type { InMindTheme } from '~/theming/types'
import type { TransitionProps } from '~/theming/variants/transition'
import type { WebStyledComponent, WebStyledComponentProps } from '~/domain'


export const virtualBoxProps = ['width', 'height', 'display'] as const
export type VirtualBoxProp = typeof virtualBoxProps[number]
export type VirtualBoxProps = {
  width?: string | number | string[] | number[]
  height?: string | number | string[] | number[]
  display?: string | number | string[] | number[]
}

export type BoxSharedProps =
	& LayoutProps<InMindTheme>
	& FlexboxProps<InMindTheme>
	& SpaceProps<InMindTheme>
	& TransitionProps
	& PositionProps<InMindTheme>
	& VirtualBoxProps

export type BoxWebComponent = WebStyledComponent<keyof JSX.IntrinsicElements, BoxSharedProps>
export type BoxWebProps = WebStyledComponentProps<keyof JSX.IntrinsicElements, BoxSharedProps>
