import React from 'react'
import { transparentize } from 'polished'
import type { TextInputBaseSharedProps, TextInputProps, TextInputComponent } from './types'
import { styled } from '~/theming/styled'
import type { UISize } from '~/theming/types'
import { weights } from '~/theming/variants/weight'
import { mapTestId } from '~/utils/map-test-id'

type TextInputBaseEnhancedProps = TextInputBaseSharedProps & {
  uiSize: UISize
}

const TextInputBase = styled.input.attrs(mapTestId)<TextInputBaseEnhancedProps>(
  p => `
		background: transparent;
		borderWidth: 0px;
		padding: 0px;
		fontSize: ${p.theme.uiSizes[p.uiSize] * 0.33}px;
		color: ${transparentize(0.2, p.theme.colors.contrast)};
		border: 0;
		outline: none;
	`,
  weights.medium as any,
) as TextInputComponent

export const TextInput = (props: TextInputProps) => <TextInputBase {...props}/>
