import { User } from '~/domain/user'
import { getCollectionRef } from '~/infra/firebase/firestore'

const USER_COLLECTION_KEY =  'users'

const getUsersCollection = () => getCollectionRef(USER_COLLECTION_KEY).withConverter({
  fromFirestore: (userSnapshot) => User.fromRaw(userSnapshot.data()),
  toFirestore: (user: User) => User.toRaw(user),
})

const getUser = async (userId: string) => {
  const userSnapshot = await getUsersCollection().doc(userId).get()

  return userSnapshot.exists ? userSnapshot.data() : null
}

const checkIsExistingUser = async (userId: string) => {
  const userSnapshot = await getUsersCollection().doc(userId).get()

  return userSnapshot.exists
}

const createOrUpdateUser = async (user: User) => {
  const userDocument = getUsersCollection().doc(user.id)
  await userDocument.set(user)

  return user
}

export const UserApi = {
  getUser,
  checkIsExistingUser,
  createOrUpdateUser,
}
