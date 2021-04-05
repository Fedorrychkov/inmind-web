import React, { useCallback, useMemo, useState } from 'react'
import { ChatInner } from '~/components/chat/inner'
import { Onboarding } from '~/components/course/onboarding'
import { Box } from '~/primitives/box'
import { Container } from '~/primitives/container'
import { getCourseById } from '~/services/courses'
import { styled } from '~/theming/styled'

export const CoursePage = () => {
  const courseContent = getCourseById(1)
  const [isOnboarding, setOnboarding] = useState(true)

  const {
    id,
    name: courseName,
    description: courseDescription,
    author: {
      name,
      description,
      intro,
    },
  } = courseContent

  const onboardingProps = useMemo(() => ({
    title: courseName,
    description: courseDescription,
    author: {
      name,
      description,
      intro,
    },
  }), [courseDescription, courseName, name, description, intro])

  const onStart = useCallback(() => {
    setOnboarding(false)
  }, [])

  return (
    <BackgroundContainer>
      <Container uiSaze="lg">
        <BoxContainer alignSelf="center" maxWidth={752} px={4} my={4}>
          {isOnboarding ? <Onboarding onPress={onStart} {...onboardingProps} /> : (
            <ChatInner flex={1} />
          )}
        </BoxContainer>
      </Container>
    </BackgroundContainer>
  )
}

const BackgroundContainer = styled(Box)`
  background-color: ${p => p.theme.colors.base};
`

const BoxContainer = styled(Box)`
  width: 100%;
  height: calc(100vh - 64px);
  background-color: ${p => p.theme.colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3);
  border-radius: 6px;
`
