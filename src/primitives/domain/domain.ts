import { ComponentProps, CSSProperties, Key } from 'react'
import { StyledComponent, StyledComponentProps } from 'styled-components'
import type { InMindTheme } from '~/theming/types'

export type KeyProps = {
  key?: Key
}
export type AsProps<C extends keyof JSX.IntrinsicElements | React.ComponentType<any>> = {
  as?: C
  forwardedAs?: C
}
export type InferStyledComponentProps<S extends StyledComponent<any, any, any, never>>
	= S extends StyledComponent<infer C, infer T, infer O, infer A>
	  ? (
	    & Omit<StyledComponentProps<C, T, O, A>, 'key'>
	    & KeyProps
	    & AsProps<keyof JSX.IntrinsicElements | React.ComponentType<any>>
	  ) : ComponentProps<S>

export type PrimitiveComponentBaseProps = {
  testId?: string
}

export type WebStyledComponent<T extends keyof JSX.IntrinsicElements, K extends object> =
	& StyledComponent<T, InMindTheme, K & PrimitiveComponentBaseProps, never>

export type WebStyledComponentProps<T extends keyof JSX.IntrinsicElements, K extends object> =
	& InferStyledComponentProps<WebStyledComponent<T, K>>
	& React.HTMLAttributes<T>
	& PrimitiveComponentBaseProps
	& {
	  style?: CSSProperties
	}
