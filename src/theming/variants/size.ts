import type { styleFn } from 'styled-system'

export type SizeProps = {
  lineHeight?: number
  fontSize?: number[] | number
}

const sizeWeb: styleFn = <T extends SizeProps>({ fontSize, lineHeight }: T) => {
  if (typeof fontSize === 'number') {
    return {
      fontSize: fontSize ? `${fontSize}px` : 'inherit',
      lineHeight: fontSize ? `${fontSize * (lineHeight || 1.38)}px` : 'inherit',
    }
  } else {
    return {
      lineHeight: lineHeight || '120%',
    }
  }
}

export const size = sizeWeb