import { paginationFields } from '../../../constants/paginationFields'
import catchAsync from '../../../sheard/cathAsync'
import pick from '../../../sheard/pick'
import sendResponse from '../../../sheard/sendResponce'

import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { ITicket } from './ticket.interface'
import { createTicket, deleteTicket, getAllTickets, updateTicket } from './ticket.service'

const TicketCreate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await createTicket(req.body)
    sendResponse<ITicket>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create cow ',
      data: ticket,
    })

    next()
  },
)

const getAllTicket = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await getAllTickets()

    sendResponse<ITicket[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ticket retirieved successfully',

      data: tickets,
    })
    next()
  },
)

const getSingleTicketupadte = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   

    const ticket = await updateTicket(req.params.id, req.body);

    sendResponse<ITicket>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single cow find',
      data: ticket,
    })

    next()
  },
)



const deletedBus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 

    const ticket = await deleteTicket(req.params.id);

    sendResponse<ITicket>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'cow deleted successfully',
      data: ticket,
    })

    next()
  },
)

export const CreateTicketController = {
 TicketCreate,
  getAllTicket,
  getSingleTicketupadte,

  deletedBus,
}
