import type { UISize } from '~/theming/types'
import type { WebStyledComponent, WebStyledComponentProps } from '~/primitives/domain'

export type TextInputBaseSharedProps = {
  uiSize: UISize
  disabled: boolean
}

export type TextInputComponent = WebStyledComponent<'input', TextInputBaseSharedProps>
export type TextInputProps = WebStyledComponentProps<'input', TextInputBaseSharedProps>
