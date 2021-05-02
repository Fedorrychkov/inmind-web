import firebase from 'firebase'
import 'firebase/firestore'

const getFirestore = () => firebase.firestore()

export const getCollectionRef = (collectionKey: string) => getFirestore().collection(collectionKey)