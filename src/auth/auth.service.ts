
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';


import { Secret } from 'jsonwebtoken';

import bcrypt from 'bcrypt'
import { IUser } from '../app/modules/users/users.interface';
import { User } from '../app/modules/users/user.model';
import config from '../config';
import { Admin } from '../app/modules/admin/admin.model';
import ApiError from '../error/apiError';
import { jwtHelpers } from '../helpers/jwtHelpers';


const createUser = async (user: IUser): Promise<IUser | null> => {
 
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));

  const createUser = await User.create(user)

  if (!createUser) {
    throw new Error('Failed to create user !')
  }
  return createUser
}

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
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
  const accessToken = jwtHelpers.creteToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const refreshToken = jwtHelpers.creteToken(
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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId, role } = verifiedToken;
  //checking deleted user's refresh token

  const isUserExist = await Admin.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new token

  const newAccessToken = jwtHelpers.creteToken(
    { phoneNumber: isUserExist.phoneNumber, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
};
