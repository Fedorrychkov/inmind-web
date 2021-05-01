import React, { Children, useMemo } from 'react'
import { transparentize } from 'polished'
import Modal from 'react-modal'
import { Box } from '~/primitives/box'
import { useTheme } from '~/theming/styled'

Modal.setAppElement('#root')

type Props = {
  children: React.ReactNode[] | React.ReactNode
} & any

export const CustomModal = ({ children, ...props }: Props) => {
  const arrayChildren = Children.toArray(children)
  const theme = useTheme()

  const customStyle = useMemo(() => ({
    overlay: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: transparentize(0.9, theme.colors.contrast),
    },
    content: {
      padding: 0,
      border: 0,
      inset: 'auto',
      background: theme.colors.base,
    },
  }), [theme])

  return (
    <Modal style={customStyle} {...props}>
      <Box>
        {Children.map(arrayChildren, (child) => child)}
      </Box>
    </Modal>
  )
}
