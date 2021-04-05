import { space, layout, flexbox, compose, position } from 'styled-system'
import { BoxSharedProps, BoxWebComponent, BoxWebProps, virtualBoxProps } from './types'
import { styled } from '~/theming/styled'
import { transition } from '~/theming/variants/transition'
import { mapTestId } from '~/utils/map-test-id'

export const Box: BoxWebComponent = styled.div.attrs(mapTestId)
  .withConfig({
    shouldForwardProp: (prop: any, validator) => virtualBoxProps.indexOf(prop) === -1 && validator(prop),
  })<BoxSharedProps>`
	margin: 0;
	padding: 0;
	align-items: stretch;
	border-width: 0;
	border-style: solid;
	border-color: ${(p: any) => p.theme.colors.contrast};
	display: flex;
	flex-basis: auto;
	flex-direction: column;
	flex-shrink: 0;
	min-height: 0px;
	min-width: 0px;
	max-width: 100%;
	z-index: 0;
	${compose(space, flexbox, layout, position)}
	${transition}
` as BoxWebComponent

export type BoxProps = BoxWebProps
