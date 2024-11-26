import { Schema, Model, model } from 'mongoose'
import { IUser } from './users.interface'

type UserModel = Model<IUser, Object>

const userSchema = new Schema<IUser>({
  id:{
    type:String,
    required:true,
    unique:true,
  },
  role:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,

  },
},{
    timestamps:true
})

export const User = model<IUser, UserModel>("user", userSchema);