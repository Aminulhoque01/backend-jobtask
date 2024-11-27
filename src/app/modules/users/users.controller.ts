import { NextFunction, Request, Response } from 'express'
import { UserServices } from './users.serveice'
import sendResponse from '../../../sheard/sendResponce'
import catchAsync from '../../../sheard/cathAsync'
import { IUser } from './users.interface'
import { adminSearchableFields } from '../admin/admin.constant'
import pick from '../../../sheard/pick'
import { paginationFields } from '../../../constants/paginationFields'
import httpStatus from 'http-status'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await UserServices.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to created user',
    })
  }
}

const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, adminSearchableFields)

    const paginationOptions = pick(req.query, paginationFields)

    const result = await UserServices.getAllUser(filters, paginationOptions)

    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'cow retirieved successfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  },
)

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const result = await UserServices.getSingleUser(id)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single user successfully',
      data: result,
    })
    next()
  },
)

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const updateData = req.body

    const result = await UserServices.updateUser(id, updateData)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single user successfully',
      data: result,
    })
    next()
  },
)

const deletedUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await UserServices.deletedUser(id)

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' user deleted  successfully',
      data: result,
    })
    next()
  },
)

export const UsersController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deletedUser,
}
