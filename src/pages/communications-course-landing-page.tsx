import React from 'react'
import { styled } from '~/theming/styled'
import { ReactComponent as TypographyIcon } from './communications-landing/type.svg'
import { ReactComponent as ClockIcon } from './communications-landing/clock.svg'

import chatScreenSrc from './communications-landing/chat-screen.png'

import talkingDifficultiesSrc from './communications-landing/blue-talking-difficulties.png'
import lostPublicSpeakingSrc from './communications-landing/red-lost-public-speaking.png'
import avoidConflictsSrc from './communications-landing/green-avoid-conflicts.png'
import noCareerDevelopmentSrc from './communications-landing/purple-no-career-development.png'

import { ReactComponent as AudienceDevelopersIcon } from './communications-landing/audience/audience-developers.svg'
import { ReactComponent as AudienceProjectManagersIcon } from './communications-landing/audience/audience-project-managers.svg'
import { ReactComponent as AudienceNewbiesIcon } from './communications-landing/audience/audience-newbies.svg'

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

    <AdvantagesSection>
      <AdvantageContainer>
        <AdvantageScreenImage src={chatScreenSrc} />
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
        <AdvantageScreenImage src={chatScreenSrc} />
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
    </AdvantagesSection>

    <SoftSkillsSection>
      <SoftSkillsHeading>
        С какими проблемами soft skills мы помогаем
      </SoftSkillsHeading>

      <Skills>
        <Skill>
          <SkillImage src={talkingDifficultiesSrc} />
          <SkillName>Трудности в общении</SkillName>
        </Skill>

        <Skill>
          <SkillImage src={lostPublicSpeakingSrc} />
          <SkillName>Теряетесь на публике</SkillName>
        </Skill>

        <Skill>
          <SkillImage src={noCareerDevelopmentSrc} />
          <SkillName>Нет развития в карьере</SkillName>
        </Skill>

        <Skill>
          <SkillImage src={avoidConflictsSrc} />
          <SkillName>Избегаете конфликтов</SkillName>
        </Skill>
      </Skills>
    </SoftSkillsSection>

    <AudienceSection>
      <AudienceHeading>Для кого этот курс?</AudienceHeading>
      <AudienceContainer>
        <AudienceTypeCard>
          <AudienceTypeIconContainer>
            <AudienceNewbiesIcon />
          </AudienceTypeIconContainer>

          <AudienceTypeName>Для начинающих</AudienceTypeName>
        </AudienceTypeCard>

        <AudienceTypeCard>
          <AudienceTypeIconContainer>
            <AudienceProjectManagersIcon />
          </AudienceTypeIconContainer>

          <AudienceTypeName>Для проектных менеджеров</AudienceTypeName>
        </AudienceTypeCard>

        <AudienceTypeCard>
          <AudienceTypeIconContainer>
            <AudienceDevelopersIcon />
          </AudienceTypeIconContainer>

          <AudienceTypeName>Для разработчиков</AudienceTypeName>
        </AudienceTypeCard>
      </AudienceContainer>
    </AudienceSection>

    <CourseStructureSection>
      <CourseStructureHeading>Структура курса</CourseStructureHeading>

      <CourseStructureCaption>
        <p>Каждая подтема содержит от 1 до 4 уроков.</p>
        <p>В уроках предусмотрена практика с автоматическим ботом.</p>
      </CourseStructureCaption>

      <CourseStructureList>
        <CourseStructurePoint>
          Общие принципы конструктивного общения
        </CourseStructurePoint>

        <CourseStructurePoint>
          Доверительные отношения: как слышать и понимать друг друга
        </CourseStructurePoint>

        <CourseStructurePoint>
          Критика и продвигающая обратная связь
        </CourseStructurePoint>

        <CourseStructurePoint>
          Эффективная аргументация
        </CourseStructurePoint>

        <CourseStructurePoint>
          Решение конфликтов
        </CourseStructurePoint>

        <CourseStructurePoint>
          Работа в команде
        </CourseStructurePoint>

        <CourseStructurePoint>
          Работа с собственным стрессом
        </CourseStructurePoint>
      </CourseStructureList>
    </CourseStructureSection>
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

const AdvantagesSection = styled(Section)``

const AdvantageActionLabel = styled.p`
  margin: 0 0 4px;

  color: #F46856;
  font-size: 18px;
  font-weight: bold;
`

const AdvantageContainer = styled.div`
  margin-bottom: 24px;
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

const SoftSkillsSection = styled(Section)`
  background: #F9FCFF;
`

const SoftSkillsHeading = styled(HeroHeading)`
  margin: 0 0 36px;
`

const Skills = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Skill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-bottom: 48px;
`

const SkillImage = styled.img`
  margin-bottom: 12px;
  object-fit: contain;
`

const SkillName = styled.p`
  position: relative;
  font-size: 18px;

  &:after {
    position: absolute;
    bottom: -10px;

    display: block;
    content: '';
    width: 72px;
    height: 2px;

    background: #242424;
  }
`

const AudienceSection = styled(Section)`
  padding-top: 68px;
`

const AudienceHeading = styled(HeroHeading)`
  margin: 0 0 44px;
`

const AudienceContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const AudienceTypeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 32px;
  margin-bottom: 32px;

  width: 100%;
  aspect-ratio: 18 / 9;

  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3);
  border-radius: 6px;
`

const AudienceTypeIconContainer = styled.div`

`

const AudienceTypeName = styled.p`
  font-size: 22px;
  line-height: 1.5;
  text-align: center;
`

const CourseStructureSection = styled(Section)``

const CourseStructureHeading = styled(HeroHeading)`
  margin-bottom: 18px;
`

const CourseStructureCaption = styled.div`
  margin-bottom: 54px;

  font-style: italic;
  font-size: 16px;

  p {
    margin: 0;
  }
`

const CourseStructureList = styled.ol`
  list-style: decimal inside;
;

  margin: 0;
  padding: 0;
`

const CourseStructurePoint = styled.li`
  padding: 18px 43px;
  margin: 0;

  color: #242424;
  border-radius: 4px;

  transition: all 0.25s 0s ease-in-out;

  &:hover {
    background-color: #F6FBFF;
  }
`

export { CommunicationsCourseLandingPage }