import firebase from 'firebase'

export type FirebaseUserType = firebase.User

const getFirebaseAuth = () => firebase.auth()

const SignInProviders = {
  GoogleAuthProvider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  FacebookAuthProvider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
}

export { getFirebaseAuth, SignInProviders }