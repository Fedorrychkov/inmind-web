import { makeAutoObservable } from 'mobx'
import { User } from '~/domain/user'
import firebase from 'firebase'

class AppStore {
  currentUser: User | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get isAuthenticated() {
    return this.currentUser !== null
  }

  signOut() {
    this.currentUser = null
  }

  signInWithFirebase(firebaseUser: firebase.User) {
    const user = new User({
      id: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
    })

    this.currentUser = user
  }
}

export { AppStore }