import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { Box } from '~/primitives/box'
import { Container } from '~/primitives/container'
import { IStore } from '~/store/types'
import { styled } from '~/theming/styled'
import { getFirebaseAuth, SignInProviders } from '~/infra/firebase/auth'

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    SignInProviders.GoogleAuthProvider,
    SignInProviders.FacebookAuthProvider,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
}

export const AuthPage = () => {
  const firebaseAuth = getFirebaseAuth()

  firebaseAuth.onAuthStateChanged((user) => {
    console.log(user)
  })

  return (
    <BackgroundContainer>
      <Container uiSaze="lg">
        <BoxContainer alignSelf="center" maxWidth={752} my={4}>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebaseAuth}
          />
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
