import express from 'express'
import { AdminRoutes } from '../app/modules/admin/admin.router'
import { AuthRoutes } from '../auth/autho.route'
import { UserRoutes } from '../app/modules/users/users.route'
import { BusRoutes } from '../app/modules/Bus/bus.router'
import { TickRoutes } from '../app/modules/Ticket/ticket.router'

const router = express.Router()

const modulesRoutes = [

  {
    path: '/user',
    route: UserRoutes,
  },

  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
 
  {
    path: '/ticket',
    route: TickRoutes,
  },
  {
    path: '/bus',
    route: BusRoutes,
  },

]
modulesRoutes.forEach(route => router.use(route.path, route.route))

export default router
