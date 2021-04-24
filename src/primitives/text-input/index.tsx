import React, { useCallback, useMemo, useState } from 'react'
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
	`,
  weights.medium as any,
) as TextInputComponent

export const TextInput = (props: TextInputProps) => {
  const [scrollHeight, setScrollHeight] = useState(null)

  const handleContentSize = useCallback((e: any) => {
    setScrollHeight(e.nativeEvent.contentSize.height)
  }, [])

  const styles = useMemo(() => {
    const result = {
      height: scrollHeight,
      outline: 'none',
    }

    return result
  }, [scrollHeight])

  return (
    <TextInputBase
      onContentSizeChange={handleContentSize}
      style={styles}
      {...props}
    />
  )
}