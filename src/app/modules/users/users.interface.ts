import { Model } from "mongoose"


export type IUser = {
  id: string
  role: string
  password: string
}


export const SearchableFields = ['name', 'role', 'address']

export const filterableFields = ['searchTerm', 'name', 'location', 'breed']

export type IUserFilters = {
  searchTerm?: string
  role?: string

  budget?: string
}


export type UserModel = Model<IUser, Record<string,unknown>>