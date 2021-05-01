import firebase from 'firebase'

const getFirebaseAuth = () => firebase.auth()

const SignInProviders = {
  GoogleAuthProvider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  FacebookAuthProvider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
}

export { getFirebaseAuth, SignInProviders }