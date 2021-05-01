import firebase from 'firebase'
import 'firebase/firestore'

const firestore = firebase.firestore()

export const getCollectionRef = (collectionKey: string) => firestore.collection(collectionKey)