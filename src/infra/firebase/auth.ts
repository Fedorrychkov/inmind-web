import firebase from 'firebase'

export type FirebaseUserType = firebase.User

const getFirebaseAuth = () => firebase.auth()

const SignInProviders = {
  GoogleAuthProvider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  FacebookAuthProvider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
}

const onUserSignIn = (subscriber: (authUser: FirebaseUserType) => any) => {
  const firebaseAuth = getFirebaseAuth()

  firebaseAuth.onAuthStateChanged((authUser) => authUser !== null && subscriber(authUser))
}

const onUserSignOut = (subscriber: () => any) => {
  const firebaseAuth = getFirebaseAuth()

  firebaseAuth.onAuthStateChanged((authUser) => authUser === null && subscriber())
}

const Auth = {
  onUserSignIn,
  onUserSignOut,
}

export { getFirebaseAuth, SignInProviders, Auth }