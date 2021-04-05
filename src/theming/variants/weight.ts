import { variant, styleFn } from 'styled-system'

export const weightsArray = ['regular', 'medium', 'bold', 'extraBold', 'inherit'] as const
export type Weight = typeof weightsArray[number]

export const weights = {
  regular: {
    fontFamily: 'inherit',
    fontWeight: 400,
  },
  medium: {
    fontFamily: 'inherit',
    fontWeight: 500,
  },
  bold: {
    fontFamily: 'inherit',
    fontWeight: 700,
  },
  extraBold: {
    fontFamily: 'inherit',
    fontWeight: 900,
  },
  inherit: {
    fontFamily: 'inherit',
    fontWeight: 'inherit',
  },
}

export const weight: styleFn = variant({
  prop: 'weight',
  variants: weights,
})

export type WeightProps = {
  weight?: Weight
}
