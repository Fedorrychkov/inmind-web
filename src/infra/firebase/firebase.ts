import firebase from 'firebase'

export const initFirebaseApp = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyC9kqDYj3F-hAHjyo2PF4Fbtb_LLG4gDRU',
    authDomain: 'inmind-web.firebaseapp.com',
    projectId: 'inmind-web',
    storageBucket: 'inmind-web.appspot.com',
    messagingSenderId: '851658385281',
    appId: '1:851658385281:web:bae1dd00df418b353f2a80',
  }

  firebase.initializeApp(firebaseConfig)
}