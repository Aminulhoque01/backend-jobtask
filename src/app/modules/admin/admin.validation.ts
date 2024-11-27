import { z } from 'zod'

const updateAdmin = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      
    }),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    role:z.string().optional(),

  }),
})

export const AdminValidation = {
  updateAdmin,
}
