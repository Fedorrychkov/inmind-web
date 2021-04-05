import { styled } from '~/theming/styled/web'
import { Box } from '~/primitives/box'
import type { UISize } from '~/theming/types'

type EnhancedContainerProps = {
  fluid?: boolean
  uiSize: UISize
}

function getMaxWidth(size: UISize, fluid: boolean | undefined) {
  if (fluid) {
    return '100%'
  }
  switch (size) {
    case 'sm': {
      return '815px'
    }
    case 'lg': {
      return '1400px'
    }
    default: {
      return '1020px'
    }
  }
}

export const Container = styled(Box)<EnhancedContainerProps>`
	width: 100%;
	margin: 0 auto;
	max-width: ${p => getMaxWidth(p.uiSize, p.fluid)};
`

Container.defaultProps = {
  fluid: false,
}