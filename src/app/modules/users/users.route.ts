import express from 'express'
import { UsersController } from './users.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()


router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UsersController.getSingleUser)

router.patch('/:id',  auth(ENUM_USER_ROLE.ADMIN), UsersController.updateUser)

router.delete('/:id',  auth(ENUM_USER_ROLE.ADMIN), UsersController.deletedUser)

router.get('/',  UsersController.getAllUser)


export const UserRoutes=router

