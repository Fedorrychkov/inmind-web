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
}

export { User }