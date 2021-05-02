import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Redirect } from 'react-router'

import { Box } from '~/primitives/box'
import { Text } from '~/primitives/text'
import { Container } from '~/primitives/container'
import { styled } from '~/theming/styled'
import { getFirebaseAuth, SignInProviders, FirebaseUserType } from '~/infra/firebase/auth'

import FirebaseAuth from 'react-firebaseui/FirebaseAuth'
import facebookIconUrl from './facebook-signin-provider-icon.svg'

import { appStore } from '~/store'

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    {
      provider: SignInProviders.GoogleAuthProvider,
      fullLabel: 'Войти через Google',
    },
    {
      provider: SignInProviders.FacebookAuthProvider,
      fullLabel: 'Войти через Facebook',
      iconUrl: facebookIconUrl,
    },
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
}

const useListenAuthChange = () => useEffect(() => {
  const firebaseAuth = getFirebaseAuth()

  firebaseAuth.onAuthStateChanged((authProviderUser) => {
    const isLoggingOut = authProviderUser === null

    if (isLoggingOut) {
      appStore.signOut()
      return
    }

    appStore.signInWithFirebase(authProviderUser as FirebaseUserType)
  })
}, [])

export const AuthPage = observer(() => {
  useListenAuthChange()

  if (appStore.isAuthenticated) {
    return (
      <Redirect to="/" />
    )
  }

  const firebaseAuth = getFirebaseAuth()

  return (
    <BackgroundContainer>
      <Container uiSaze="lg">
        <BoxContainer alignSelf="center" maxWidth={752} my={4}>
          <Heading>Вход в аккаунт</Heading>
          <FirebaseAuthForm
            uiConfig={uiConfig}
            firebaseAuth={firebaseAuth}
          />
        </BoxContainer>
      </Container>
    </BackgroundContainer>
  )
})

const BackgroundContainer = styled(Box)`
  background-color: ${p => p.theme.colors.base};
`

const BoxContainer = styled(Box)`
  width: 480px;
  height: 300px;
  padding: 48px 36px 36px;

  background-color: ${p => p.theme.colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3);
  border-radius: 6px;
`

const Heading = styled(Text)`
  margin: 0 auto 48px;

  color: #171725;
  font-size: 22px;
  font-weight: bold;
`

const FirebaseAuthForm = styled(FirebaseAuth)`
  & .firebaseui-container,
  & .firebaseui-card-content,
  & .firebaseui-idp-list {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  & .firebaseui-list-item {
    width: 100%;
  }

  & .firebaseui-idp-google,
  & .firebaseui-idp-facebook {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 100%;

    padding: 12px;
    margin-bottom: 12px;

    background-color: #fff !important;
    box-shadow: none;
    border-radius: 10px;
    border: 2px solid #F1F1F5;
  }

  & .firebaseui-idp-text {
    color: #696974;
  }
`