import React from 'react'
import { styled } from '~/theming/styled'
import { ReactComponent as TypographyIcon } from './communications-landing/type.svg'
import { ReactComponent as ClockIcon } from './communications-landing/clock.svg'
import chatScreen from './communications-landing/chat-screen.png'

const CommunicationsCourseLandingPage = () => (
  <Layout>
    <Hero>
      <HeroHeading>Принципы эффективной коммуникации</HeroHeading>
      <HeroCaption>Что делать, если попался сложный человек в команде? Расскажем на практике!</HeroCaption>
      <ActionButton>
        Начать учиться за 0 ₽
      </ActionButton>
      <CourseDetailsContainer>
        <CourseDetails>
          <IconContainer>
            <TypographyIcon />
          </IconContainer>
          7 блоков
        </CourseDetails>

        <CourseLength>
          <IconContainer>
            <ClockIcon />
          </IconContainer>
          по 20 минут
        </CourseLength>
      </CourseDetailsContainer>
    </Hero>
    <Section>
      <AdvantageContainer>
        <AdvantageScreenImage src={chatScreen} />
        <Advantage>
          <AdvantageActionLabel>
            Учись
          </AdvantageActionLabel>
          <AdvantageHeading>Простота обучения</AdvantageHeading>
          <AdvantageCaption>
            Эффективное общение - это инструмент,
            который помогает достигать целей в любых сферах:
            продвижение на работе, крепкие отношения,
            полезные знакомства.
          </AdvantageCaption>
        </Advantage>
      </AdvantageContainer>

      <AdvantageContainer>
        <AdvantageScreenImage src={chatScreen} />
        <Advantage>
          <AdvantageActionLabel>
            Доступно
          </AdvantageActionLabel>
          <AdvantageHeading>Парктика + Теория</AdvantageHeading>
          <AdvantageCaption>
            Наш тренажер проведет вас через большое число
            реальных рабочих кейсов и поможет овладеть
            навыком эффективной коммуникации на практике.
          </AdvantageCaption>
        </Advantage>
      </AdvantageContainer>
    </Section>
  </Layout>
)

const HeroHeading = styled.h2`
  margin-bottom: 12px;

  font-size: 36px;
  font-weight: 900;
  line-height: 44px;
`

const HeroCaption = styled.p`
  font-size: 18px;
  margin-bottom: 52px;
`


const Layout = styled.div`

`

const ActionButton = styled.button`
  background-color: #134EE4;
  padding: 20px 36px;
  margin-bottom: 48px;
  border: none;
  border-radius: 4px;

  color: #fff;
  font-weight: bold;
`

const CourseDetailsContainer = styled.footer`
  display: flex;
`

const CourseDetails = styled.div`
  display: flex;
  align-items: center;
`

const CourseLength = styled(CourseDetails)`
  margin-left: 80px;
`

const IconContainer = styled.div`
  padding-top: 6px;
  margin-right: 6px;
`

const Section = styled.div`
  padding: 64px 32px;
`

const Hero = styled(Section)`
  width: 100%;
  padding: 36px 24px;
  background-color: #C9F1FF;
  color: #242424;
`

const AdvantageActionLabel = styled.p`
  margin: 0 0 4px;

  color: #F46856;
  font-size: 18px;
  font-weight: bold;
`

const AdvantageContainer = styled.div`
  margin-bottom: 48px;
`

const Advantage = styled.div`
  display: flex;
  flex-direction: column;
`

const AdvantageHeading = styled(HeroHeading)`
  margin-bottom: 12px;
`

const AdvantageCaption = styled(HeroCaption)`
  line-height: 24px;
`

const AdvantageScreenImage = styled.img`
  width: 100%;
  object-fit: contain;
  margin-bottom: 24px;
`


export { CommunicationsCourseLandingPage }