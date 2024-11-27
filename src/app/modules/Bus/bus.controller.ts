import { paginationFields } from '../../../constants/paginationFields'
import catchAsync from '../../../sheard/cathAsync'
import pick from '../../../sheard/pick'
import sendResponse from '../../../sheard/sendResponce'
import { getAvailableBuses } from './bus.constant'
import { filterableFields, IBus } from './bus.interface'
import { BusCreateService } from './bus.service'
import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'

const createBus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...busData } = req.body
    const result = await BusCreateService.createBus(busData)

    sendResponse<IBus>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create cow ',
      data: result,
    })

    next()
  },
)

const getAllBus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await getAvailableBuses()

    sendResponse<IBus[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get all bus successfully',

      data: tickets,
    })
    next()
  },
)


const getSingleBus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const result = await BusCreateService.getSingleBus(id)

    sendResponse<IBus>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single cow find',
      data: result,
    })

    next()
  },
)

const updateBus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const updateData = req.body
    const result = await BusCreateService.updateBus(id, updateData)

    sendResponse<IBus>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'cow updated successfully',
      data: result,
    })

    next()
  },
)

const deletedBus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const result = await BusCreateService.deletedBus(id)

    sendResponse<IBus>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'cow deleted successfully',
      data: result,
    })

    next()
  },
)

export const CreateBusController = {
  createBus,
  busService,
  getSingleBus,
  updateBus,
  deletedBus,
}
