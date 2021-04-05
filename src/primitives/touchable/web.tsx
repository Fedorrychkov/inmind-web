import { flexbox, space, layout, compose } from 'styled-system'
import { TouchableWebComponent, TouchableSharedProps, TouchableWebProps } from './types'
import { styled } from '~/theming/styled/web'
import { transition } from '~/theming/variants/transition'
import { mapTestId } from '~/utils/map-test-id'

export const Touchable = styled.button
  .attrs<TouchableSharedProps>(({ onClick }) => ({ onClick }))
  .attrs<TouchableSharedProps>(mapTestId)<TouchableSharedProps>
`
	${transition}
	${compose(space, flexbox, layout)}
	width: auto;
	color: inherit;
	padding: 0;
	background: transparent;
	border: none;
	cursor: pointer;
	font: inherit;
	line-height: normal;
	overflow: visible;
	outline: none;
` as TouchableWebComponent

Touchable.defaultProps = {
  type: 'button',
}

export type TouchableProps = TouchableWebProps
