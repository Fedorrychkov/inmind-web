import { makeAutoObservable } from 'mobx'
import { User, IUserProps } from '~/domain/user'

class AppStore {
  currentUser?: User

  contructor() {
    makeAutoObservable(this)
  }

  signOut() {
    this.currentUser = undefined
  }

  signIn(userProps: IUserProps) {
    const user = new User(userProps)
    this.currentUser = user
  }
}

export { AppStore }