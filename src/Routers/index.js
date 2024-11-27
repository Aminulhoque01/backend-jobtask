import express from 'express'
import { UserRouters } from '../app/modules/users/user.route'
import { AdminRoutes } from '../app/modules/admin/admin.route'
import { AuthRoutes } from '../app/modules/auth/auth.route'

const router = express.Router()

const modulesRoutes = [
  {
    path: '/',
    route: UserRouters,
  },
  
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
]
modulesRoutes.forEach(route => router.use(route.path, route.route))

export default router
