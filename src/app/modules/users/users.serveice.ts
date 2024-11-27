import config from '../../../config/index'
import { User } from './user.model'
import { IUser } from './users.interface'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUserId()

  user.id = id

  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  // set role

  //default user

  const createdUser = await User.create(user)

  if (!createUser) {
    throw new Error('Failed to create user')
  }

  return createdUser
}

export const UserServices= {
  createUser,
}
