import { color, ColorProps, TextAlignProps, textAlign, compose } from 'styled-system'
import { styled } from '~/theming/styled'
import { weight, WeightProps } from '~/theming/variants/weight'
import { transition, TransitionProps } from '~/theming/variants/transition'
import type { WebStyledComponent, WebStyledComponentProps } from '~/primitives/domain'
import { size, SizeProps } from '~/theming/variants/size'
import { InMindTheme } from '~/theming/types'
import { mapTestId } from '~/utils/map-test-id'

export const virtualAnchorProps = ['color'] as const
export type VirtualAnchorProp = typeof virtualAnchorProps[number]
export type VirtualAnchorProps = {
  color?: string
}

type AnchorEnhancedProps =
	& ColorProps<InMindTheme>
	& TextAlignProps<InMindTheme>
	& SizeProps
	& WeightProps
	& TransitionProps
	& VirtualAnchorProps

export const Anchor = styled.a.attrs(mapTestId)
  .withConfig({
    shouldForwardProp: (prop: any, validator) => virtualAnchorProps.indexOf(prop) === -1 && validator(prop),
  })<AnchorEnhancedProps>`
	${transition}
	${weight}
	${compose(color, textAlign)}
	${p => `
		text-decoration: none;
		&:hover {
			color: ${p.theme.colors.contrast};
			cursor: pointer;
		}
	`}
	${size}
` as WebStyledComponent<'a', AnchorEnhancedProps>

Anchor.defaultProps = {
  weight: 'regular',
  color: 'primary',
}

export type AnchorProps = WebStyledComponentProps<'a', AnchorEnhancedProps>