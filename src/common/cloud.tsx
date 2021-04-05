import React, { FC } from 'react'
import { Box } from '~/primitives/box'
import { styled } from '~/theming/styled'

export const Cloud: FC = ({ children }) => {
  return (
    <CloudBox py={30}>
      <Box maxWidth={598} style={{ margin: '0 auto' }}>
        {children}
      </Box>
    </CloudBox>
  )
}

const CloudBox = styled(Box)`
  background: rgba(201, 241, 255, 0.46);
  text-align: center;
`
