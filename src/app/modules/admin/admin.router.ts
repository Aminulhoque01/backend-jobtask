import express from 'express'
// import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller'
// import validateRequest from '../../middlewares/validateRequest'
import { AdminValidation } from './admin.validation'
import validateRequest from '../../middlewares/validateRequst'

const router = express.Router()
router.post(
  '/create-admin',

  AdminController.createAdmin
)
router.post(
  '/login',

  AdminController.loginAdmin
)
router.get('/:id', AdminController.getSingleAdmin)
router.get('/', AdminController.getAllAdmins)
router.get('/my-profile', AdminController.getAllAdmins)

router.delete('/:id', AdminController.deleteAdmin)

router.patch(
  '/my-profile',
  validateRequest(AdminValidation.updateAdmin),
  AdminController.updateAdmin
)
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdmin),
  AdminController.updateAdmin
)

export const AdminRoutes = router
