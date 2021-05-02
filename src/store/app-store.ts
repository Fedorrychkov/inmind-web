import { makeAutoObservable } from 'mobx'
import { User, IUserProps } from '~/domain/user'
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

  signIn(userProps: IUserProps) {
    const user = new User(userProps)

    this.currentUser = user
  }
}

export { AppStore }