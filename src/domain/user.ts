export interface IUserProps {
  id: string
  displayName: string | null
  email: string | null
}

class User {
  id: string
  displayName: string | null
  email: string | null

  constructor(userProps: IUserProps) {
    this.id = userProps.id
    this.displayName = userProps.displayName
    this.email = userProps.email
  }

  static toRaw(user: User) {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
    }
  }

  static fromRaw(rawUser: any) {
    return new User({
      id: rawUser.id,
      email: rawUser.email,
      displayName: rawUser.displayName,
    })
  }
}

export { User }