import { Schema, Model, model } from 'mongoose'
import { IUser, UserModel } from './users.interface'


const userSchema = new Schema<IUser>({
  id:{
    type:String,
    required:true,
    unique:true,
  },
  role:{
    type:String,
    enum:["admin","user"],
    required:true,
  },
  password:{
    type:String,
    required:true,

  },
  
},{
    timestamps:true,
    toJSON: {
      virtuals: true,
    },
})

export const User = model<IUser, UserModel>("user", userSchema);