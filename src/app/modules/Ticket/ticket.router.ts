import express from "express"
import validateRequest from "../../middlewares/validateRequst"
import auth from "../../middlewares/auth"
 
import { ENUM_USER_ROLE } from "../../../enums/user"
import { CreateTicketController } from "./ticket.controller"

const router = express.Router()

router.post( '/',CreateTicketController.TicketCreate)

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), CreateTicketController.getSingleTicketupadte)

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), CreateTicketController.deletedBus)

 
router.get('/',auth(ENUM_USER_ROLE.ADMIN), CreateTicketController.getAllTicket)

export const TickRoutes=router