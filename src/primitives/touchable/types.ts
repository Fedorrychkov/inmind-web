import type { FlexboxProps, LayoutProps, SpaceProps } from 'styled-system'
import type { TransitionProps } from '~/theming/variants/transition'
import type { InMindTheme } from '~/theming/types'
import type { WebStyledComponent, WebStyledComponentProps } from '~/domain'

export type TouchableSharedProps =
	& LayoutProps<InMindTheme>
	& FlexboxProps<InMindTheme>
	& SpaceProps<InMindTheme>
	& TransitionProps

export type TouchableWebComponent = WebStyledComponent<'button', TouchableSharedProps>
export type TouchableWebProps = WebStyledComponentProps<'button', TouchableSharedProps>
