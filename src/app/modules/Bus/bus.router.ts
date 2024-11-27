import express from "express"
import validateRequest from "../../middlewares/validateRequst"
import auth from "../../middlewares/auth"
import { CreateBusController } from "./bus.controller"
import { ENUM_USER_ROLE } from "../../../enums/user"

const router = express.Router()

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  
  CreateBusController.createBus
)

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), CreateBusController.getSingleBus)

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), CreateBusController.updateBus)

router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), CreateBusController.deletedBus)

router.get('/', CreateBusController.getAllBus)

export const BusRoutes = router