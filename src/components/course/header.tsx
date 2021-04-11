import React from 'react'
import { Box } from '~/primitives/box'
import { Text } from '~/primitives/text'
import { styled } from '~/theming/styled'

type Props = {
  title: string
}

export const CourseHeader = ({ title }: Props) => {
  return (
    <Container position="sticky" top={0} px={4} py={3}>
      <Text color="contrast" fontSize={18} lineHeight={2.6} weight="bold">{title}</Text>
    </Container>
  )
}

const Container = styled(Box)`
  border-radius: 6px 6px 0px 0px;
  border-bottom: 2px solid ${p => p.theme.colors.common};
`
