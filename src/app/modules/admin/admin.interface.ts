import { Model } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
}

export type IAdmin = {
  id: string
  name: UserName
  phoneNumber: string
  role: 'Admin'
  password: string
  address: string
  needsPasswordChange: true | false
}

export type IAdminModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin,'phoneNumber'| 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

// export type AdminModel = Model<IAdmin, Record<string, unknown>>

export type IAdminFilters = {
  searchTerm?: string
  id?: string
  email?: string
  phoneNumber?: string
  address?:string
  role?:string
  
  
}
