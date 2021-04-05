import { TextAlignProps, textAlign } from 'styled-system'
import { styled } from '~/theming/styled/web'
import { weight, WeightProps } from '~/theming/variants/weight'
import type { WebStyledComponent, WebStyledComponentProps } from '~/domain'
import { size, SizeProps } from '~/theming/variants/size'
import type { InMindTheme } from '~/theming/types'

type GradientTextEnhancedProps = TextAlignProps<InMindTheme> & SizeProps & WeightProps

export const GradientText = styled.span<GradientTextEnhancedProps>`
	${weight}
	${size}
	${textAlign}
	color: #0c50ff;
	background: linear-gradient(to right, #0c50ff 0%, #0c50ff 24%, #5b9dff 55.73%, #ff74f1 75%, #ff74f1 100%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
` as WebStyledComponent<'span', GradientTextEnhancedProps>

export type GradientTextProps = WebStyledComponentProps<'span', GradientTextEnhancedProps>