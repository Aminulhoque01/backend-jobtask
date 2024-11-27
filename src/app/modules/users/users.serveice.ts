import { SortOrder } from 'mongoose'
import config from '../../../config/index'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IpaginationsOptions } from '../../../interfaces/pagination'
import { User } from './user.model'
import { userSearchableFields } from './users.constant'
import { IUser, IUserFilters } from './users.interface'
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


const getAllUser = async (
  filters: IUserFilters,
  paginationOptions: IpaginationsOptions
) => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await User.find(whereConditions)

    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await User.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}


const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}
const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}
const deletedUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const UserServices= {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deletedUser,
}
