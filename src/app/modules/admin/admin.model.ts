import { Schema, model } from 'mongoose'
import { IAdmin, IAdminModel } from './admin.interface'
import bcrypt from 'bcrypt'

const AdminSchema = new Schema<IAdmin,Record<string, never>,IAdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<
  IAdmin,
 'phoneNumber'| 'id' | 'password' | 'role' | 'needsPasswordChange'
> | null> {
  return await Admin.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

AdminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savePassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword);
};

export const Admin = model<IAdmin, IAdminModel>('Admin', AdminSchema)
