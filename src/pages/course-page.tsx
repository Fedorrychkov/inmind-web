import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CourseInner } from '~/components/course/inner'
import { Onboarding } from '~/components/course/onboarding'
import { Box } from '~/primitives/box'
import { Container } from '~/primitives/container'
import { getCourseById } from '~/services/courses'
import { setCurrentCourse } from '~/store/course-progress'
import { IStore } from '~/store/types'
import { styled } from '~/theming/styled'

export const CoursePage = () => {
  const [isOnboarding, setOnboarding] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const courseContent = getCourseById(1)
    console.log(courseContent, 'courseContent')
    dispatch(setCurrentCourse(courseContent))
  }, [dispatch])

  const { currentCourse } = useSelector((state: IStore) => state.courseProgress)

  const {
    author,
    name,
    description,
  } = currentCourse || {}

  const onboardingProps = useMemo(() => ({
    title: name,
    description,
    author,
  }), [name, description, author])

  useEffect(() => {
    // TODO: Get all messages from course with flat list (without progress bar in chat header)
    // TODO: Set chat history to localstorage?
    // TODO: Need to create simple chat flow with simple buttons
  }, [currentCourse])

  const onStart = useCallback(() => {
    setOnboarding(false)
  }, [])

  return (
    <BackgroundContainer>
      <Container uiSaze="lg">
        {currentCourse && (
          <BoxContainer alignSelf="center" maxWidth={752} my={4}>
            {isOnboarding ? <Onboarding onPress={onStart} px={4} {...onboardingProps} /> : (
              <CourseInner course={currentCourse} flex={1} />
            )}
          </BoxContainer>
        )}
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
