import { color, textAlign, compose, fontSize } from 'styled-system'
import { TextWebProps, TextSharedProps, TextWebComponent, virtualTextProps } from './types'
import { weight } from '~/theming/variants/weight'
import { size } from '~/theming/variants/size'
import { design } from '~/theming/variants/design'
import { transition } from '~/theming/variants/transition'
import { styled } from '~/theming/styled'
import { mapTestId } from '~/utils/map-test-id'

export const Text = styled.span.attrs(mapTestId)
  .withConfig({
    shouldForwardProp: (prop: any, validator) => virtualTextProps.indexOf(prop) === -1 && validator(prop),
  })<TextSharedProps>`
	${design}
	${transition}
	${size}
	${weight}
	${compose(color, textAlign, fontSize)}
	${p => `
		text-decoration: none;
		${p.oneLine ? `
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		` : ''}
	`}
` as TextWebComponent

Text.defaultProps = {
  design: 'inherit',
  weight: 'inherit',
}

export type TextProps = TextWebProps