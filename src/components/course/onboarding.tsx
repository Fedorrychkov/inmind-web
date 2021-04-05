import React from 'react'
import { Button } from '~/common/button'
import { Cloud } from '~/common/cloud'
import { Box } from '~/primitives/box'
import { Text } from '~/primitives/text'
import { Member } from '../chat/member'

type Props = {
  onPress?: () => void
  title: string
  description: string
  author: {
    name: string
    description: string
    intro: string
  },
}

export const Onboarding = ({
  title,
  description,
  author,
  onPress = () => {},
}: Props) => {
  return (
    <Box p={4} flex={1}>
      <Box mt={5}>
        <Text color="contrast" fontSize={36} weight="bold" textAlign="center">{title}</Text>
      </Box>
      <Box mt={29} mb={50}>
        <Text color="black" lineHeight={1.5} weight="thin" fontSize={18}>{description}</Text>
      </Box>
      <Box flex={1}>
        <Cloud>
          <Text fontSize={18} weight="regular" style={{ fontStyle: 'italic' }}>{author.intro}</Text>
        </Cloud>
        <Member icon="author" name={author.name} description={author.description} />
      </Box>
      <Box>
        <Button onPress={onPress}>
          Вперёд
        </Button>
      </Box>
    </Box>
  )
}
