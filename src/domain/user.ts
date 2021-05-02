interface IUserProps {
  id: string
  displayName?: string
  email?: string
}

class User {
  id: string
  displayName?: string
  email?: string

  constructor(userProps: IUserProps) {
    this.id = userProps.id
    this.displayName = userProps.displayName
    this.email = userProps.email
  }
}

export { User, IUserProps }