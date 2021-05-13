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

import logoStockmanSrc from './communications-landing/companies/logo-stockman.png'
import logoJacobsSrc from './communications-landing/companies/logo-jacobs.png'
import logoAlphaBankSrc from './communications-landing/companies/logo-alpha-bank.png'
import logoHenkelSrc from './communications-landing/companies/logo-henkel.png'
import logoRussianBankSrc from './communications-landing/companies/logo-russian-bank.png'

import { ReactComponent as ProsIcon } from './communications-landing/icon-pros.svg'

import storyCharactersSrc from './communications-landing/story-characters.png'

const CommunicationsCourseLandingPage = () => (
  <Layout>
    <HeroSection>
      <SectionContent>
        <HeroHeading>Принципы эффективной коммуникации</HeroHeading>
        <HeroCaption>Что делать, если попался сложный человек в команде? Расскажем на практике!</HeroCaption>
        <ActionButton>
          Купить подписку
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
      </SectionContent>
      <HeroCharactersImage src={storyCharactersSrc} />
    </HeroSection>

    <AdvantagesSection>
      <AdvantagesSectionContent>
        <ReorderedAdvantageScreenImage src={chatScreenSrc} />
        <AdvantageOne>
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
        </AdvantageOne>

        <AdvantageScreenImage src={chatScreenSrc} />
        <AdvantageTwo>
          <AdvantageActionLabel>
            Доступно
          </AdvantageActionLabel>
          <AdvantageHeading>Практика + Теория</AdvantageHeading>
          <AdvantageCaption>
            Наш тренажер проведет вас через большое число
            реальных рабочих кейсов и поможет овладеть
            навыком эффективной коммуникации на практике.
          </AdvantageCaption>
        </AdvantageTwo>
      </AdvantagesSectionContent>
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
        <p>Уроки содержат практику с автоматическим ботом.</p>
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


    <OurStudentsSection>
      <OurStudentsHeading>С нами уже учатся сотрудники компаний</OurStudentsHeading>
      <CompanyList>
        <CompanyLogo src={logoStockmanSrc} />
        <CompanyLogo src={logoJacobsSrc} height="36px" />
        <CompanyLogo src={logoAlphaBankSrc} />
        <CompanyLogo src={logoHenkelSrc} />
        <CompanyLogo src={logoRussianBankSrc} />
      </CompanyList>

      <StudentsStastistics>
        <StudentsStatsCard>
          <CardHeading color="#1C9971">
            Учатся
          </CardHeading>
          <CardDescription>
            511 — студентов за время обучения на курсах
          </CardDescription>
        </StudentsStatsCard>

        <StudentsStatsCard>
          <CardHeading color="#9B51E0">
            Не бросают
          </CardHeading>
          <CardDescription>
            78% — средняя доходимость студентов на один курс
          </CardDescription>
        </StudentsStatsCard>

        <StudentsStatsCard>
          <CardHeading color="#EB5757">
            Любят
          </CardHeading>
          <CardDescription>
            4,86 — средняя оценка курса после завершения
          </CardDescription>
        </StudentsStatsCard>
      </StudentsStastistics>
    </OurStudentsSection>

    <PricingsSection>
      <PricingsHeading>Тарифы</PricingsHeading>
      <PricingPlansContainer>
        <SubscriptionPlanCard>
          <PricingPlanHeading>Я сам</PricingPlanHeading>

          <PricingPlanDescription>
            Если хотите обучаться в свободное время
            и не тратить на это много денег и без
            дополнительных вложений
          </PricingPlanDescription>

          <PricingDetails>
            <PricingDetailsItem>
              <PricingIconContainer>
                <ProsIcon />
              </PricingIconContainer>
              Первый плюс
            </PricingDetailsItem>

            <PricingDetailsItem>
              <PricingIconContainer>
                <ProsIcon />
              </PricingIconContainer>
              Второй плюс
            </PricingDetailsItem>

            <PricingDetailsItem>
              <PricingIconContainer>
                <ProsIcon />
              </PricingIconContainer>
              Третий плюс
            </PricingDetailsItem>

            <PricingDetailsItem>
              <PricingIconContainer>
                <ProsIcon />
              </PricingIconContainer>
              Четвертый плюс
            </PricingDetailsItem>

            <PricingDetailsItem>
              <PricingIconContainer>
                <ProsIcon />
              </PricingIconContainer>
              Пятый плюс
            </PricingDetailsItem>
          </PricingDetails>

          <PurchaseButton>Купить подписку</PurchaseButton>
        </SubscriptionPlanCard>
      </PricingPlansContainer>
    </PricingsSection>
  </Layout>
)

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  padding: 48px 32px 72px;

  @media (min-width: 680px) {
    padding: 48px 48px 72px;
  }
`

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1100px;
  width: 100%;
  margin: auto;
  position: relative;
`

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Image = styled.img`
  max-width: 502px;
`

const Heading = styled.h2`
  margin-bottom: 20px;
  max-width: 622px;

  font-size: 36px;
  font-weight: 900;
  line-height: 44px;
  text-align: center;
`

const CommonButton = styled.button`
  padding: 20px 36px;

  background: #134EE4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;

  color: white;
  font-weight: bold;

  transition: all 0.2s 0s ease-out;

  &:hover {
    background: #0b43cf;
  }
`

const HeroCaption = styled.p`
  max-width: 622px;
  margin-bottom: 56px;

  font-size: 18px;
`

const HeroSection = styled(Section)`
  position: relative;
  align-items: flex-start;
  width: 100%;
  padding-top: 36px;
  padding-bottom: 24px;
  background-color: #C9F1FF;
  color: #242424;
`

const HeroCharactersImage = styled.img`
  display: none;

  @media (min-width: 680px) {
    position: absolute;
    right: 2%;
    bottom: 0;

    display: block;
    width: 400px;
  }

  @media (min-width: 1000px) {
    right: auto;
    left: 650px;
  }
`

const HeroHeading = styled(Heading)`
  text-align: left;
`

const ActionButton = styled(CommonButton)`
  margin-bottom: 48px;
`

const CourseDetailsContainer = styled.footer`
  display: flex;
`

const CourseDetails = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  &:last-of-type {
    margin-right: 0;
  }
`

const CourseLength = styled(CourseDetails)`
`

const IconContainer = styled.div`
  padding-top: 6px;
  margin-right: 6px;
`

const AdvantagesSection = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 64px;
  margin: auto;
`

const AdvantagesSectionContent = styled(SectionContent)`
  display: grid;
  grid-template-areas:
    "advantage_one_picture"
    "advantage_one_text"
    "advantage_two_picture"
    "advantage_two_text";

  justify-items: center;
  row-gap: 16px;

  @media (min-width: 960px) {
    justify-items: right;
    align-items: center;

    row-gap: 54px;
    column-gap: 8%;

    grid-template-areas:
      "advantage_one_picture advantage_one_text"
      "advantage_two_text advantage_two_picture";
  }
`

const AdvantageActionLabel = styled.p`
  margin: 0 0 4px;

  color: #F46856;
  font-size: 18px;
  font-weight: bold;
`

const Advantage = styled.div`
  display: flex;
  flex-flow: column;
  margin-bottom: 36px;
  max-width: 500px;
`

const AdvantageOne = styled(Advantage)`
  grid-area: advantage_one_text;

  @media(min-width: 960px) {
    justify-self: flex-start;
  }
`

const AdvantageTwo = styled(Advantage)`
  grid-area: advantage_two_text;
`

const AdvantageHeading = styled(Heading)`
  text-align: left;
  margin-bottom: 12px;
`

const AdvantageCaption = styled(HeroCaption)`
  line-height: 24px;
  margin-bottom: 0;
`

const AdvantageScreenImage = styled(Image)`
  grid-area: advantage_two_picture;

  width: 100%;
  object-fit: contain;
  max-width: 500px;

  @media (min-width: 960px) {
    justify-self: flex-start;
    flex: 1 1 380px;
  }
`

const ReorderedAdvantageScreenImage = styled(AdvantageScreenImage)`
  grid-area: advantage_one_picture;

  @media (min-width: 960px) {
    justify-self: flex-end;
    order: 2;
  }
`

const SoftSkillsSection = styled(Section)`
  background: #F9FCFF;
`

const SoftSkillsHeading = styled(Heading)`
  margin: 0 0 42px;
`

const Skills = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

const Skill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 0 24px 48px;
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

const AudienceSection = styled(Section)``

const AudienceHeading = styled(Heading)`
  margin: 0 0 44px;
`

const AudienceContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-left: -32px;
  margin-right: -32px;
`

const AudienceTypeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 16px 32px;

  width: 100%;
  max-width: 300px;
  min-width: 280px;
  padding: 32px;

  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3);
  border-radius: 6px;

`

const AudienceTypeIconContainer = styled.div``

const AudienceTypeName = styled.p`
  font-size: 22px;
  line-height: 1.5;
  text-align: center;
`

const CourseStructureSection = styled(Section)`
  padding-top: 18px;
`

const CourseStructureHeading = styled(Heading)`
  margin-bottom: 12px;
`

const CourseStructureCaption = styled.div`
  margin-bottom: 24px;

  font-style: italic;
  font-size: 18px;

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
  padding: 18px 24px;
  margin: 0;

  color: #242424;
  font-size: 18px;
  border-radius: 4px;

  transition: all 0.25s 0s ease-in-out;

  &:hover {
    background-color: #F6FBFF;
  }
`

const OurStudentsSection = styled(Section)`
  background-color: #F6FBFF;
`

const OurStudentsHeading = styled(Heading)`
  margin-bottom: 48px;
`

const CompanyList = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;

  margin-bottom: 32px;
`

const CompanyLogo = styled.img`
  max-height: ${({ height = '54px' }) => height};
  max-width: 180px;
  margin: 0 18px 32px;
`

const StudentsStastistics = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

const StudentsStatsCard = styled.div`
  width: 100%;
  min-width: 320px;
  max-width: 360px;
  min-height: 160px;
  padding: 32px;
  margin: 0 12px 24px;

  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3);
  border-radius: 6px;
`

const CardHeading = styled.p`
  margin-bottom: 8px;

  font-size: 28px;
  font-weight: bold;
  color: ${({ color }) => color};
`

const CardDescription = styled.p`
  font-size: 18px;
  line-height: 1.4;
`

const PricingsSection = styled(Section)`
`

const PricingsHeading = styled(Heading)`
  margin-bottom: 44px;
`

const PricingPlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SubscriptionPlanCard = styled.div`
  max-width: 464px;
  padding: 40px 32px;
  margin-left: -12px;
  margin-right: -12px;

  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3);
  border-radius: 6px;
`

const PricingPlanHeading = styled.p`
  margin-bottom: 6px;

  font-weight: bold;
  font-size: 28px;
  line-height: 1.15;
`

const PricingPlanDescription = styled.p`
  position: relative;
  margin-bottom: 36px;

  font-size: 14px;
  line-height: 20px;

  &::after {
    position: absolute;
    bottom: -18px;
    left: 0;
    content: '';
    height: 2px;
    width: 100%;
    background-color: #DFE1E6;;
  }
`

const PricingDetails = styled.ul`
  margin: 0 0 32px;
  padding: 0;
`

const PricingDetailsItem = styled.li`
  display: flex;
  align-items: center;

  padding: 8px 16px 8px 0;
`

const PricingIconContainer = styled.div`
  padding-top: 6px;
  margin-right: 18px;
`

const PurchaseButton = styled(CommonButton)`
  width: 100%;
`

export { CommunicationsCourseLandingPage }