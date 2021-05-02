import { flow, makeAutoObservable } from 'mobx'
import { UserApi } from '~/api/user'
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

  signIn = flow(function* (this: AppStore, userProps: IUserProps) {
    const userId = userProps.id
    const isExistingUser = yield UserApi.checkIsExistingUser(userId)

    if (isExistingUser) {
      this.currentUser = yield UserApi.getUser(userId)
      return
    }

    const user = new User(userProps)

    this.currentUser = user
    yield UserApi.createOrUpdateUser(this.currentUser)
  })
}

export { AppStore }