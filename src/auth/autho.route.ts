import express from 'express'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'
import validateRequest from '../app/middlewares/validateRequst'
import { UserValidation } from '../app/modules/users/users.zodvalidation'

const router = express.Router()
router.post(
  '/sing-up',
  validateRequest(UserValidation.createUserZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AuthController.createUser
)

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
)

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
)

export const AuthRoutes = router
