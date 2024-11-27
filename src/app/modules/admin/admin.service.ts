
import { IAdmin, IAdminFilters } from './admin.interface'
import config from '../../../config'
import bcrypt from 'bcrypt'

import mongoose, { SortOrder } from 'mongoose'
import httpStatus from 'http-status'
import { adminSearchableFields } from './admin.constant'

import { User } from '../users/user.model'


import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { IGenericResponse } from '../../../interfaces/common'
import { Admin } from './admin.model'
import ApiError from '../../../error/apiError'
import { ILoginUser, ILoginUserResponse } from '../../../auth/auth.interface'
import { IpaginationsOptions } from '../../../interfaces/pagination'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { Secret } from 'jsonwebtoken'

const createAdmin = async (user: IAdmin): Promise<IAdmin | null> => {
  if (!user.password) {
    user.password = config.default_admin_pass as string
  }
  user.password = await bcrypt.hash(
    user.password,
    Number(config.default_admin_pass)
  )

  const createUser = await Admin.create(user)

  if (!createUser) {
    throw new Error('Failed to create user !')
  }
  return createUser
}

const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IpaginationsOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Admin.find(whereConditions)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id }).populate('ManagementDepartment');
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }

  const { name, ...adminData } = payload;

  const updatedStudentData: Partial<IAdmin> = { ...adminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};
const loginAdmin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  //creating instance of User
  // const user = new User()

  //access to our instance methods
  const isUserExist = await Admin.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //match password

  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Password is incorrect or password do not match !!'
    );
  }

  //creating access token & refresh token

  const { phoneNumber: userId, role, needsPasswordChange } = isUserExist;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  // console.log(accessToken,refreshToken,needsPasswordChange)

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  // check if the faculty is exist
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete student first
    const student = await Admin.findOneAndDelete({ id }, { session });
    if (!student) {
      throw new ApiError(404, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return student;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const UserAdmin = { 
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin, 
  loginAdmin
}
