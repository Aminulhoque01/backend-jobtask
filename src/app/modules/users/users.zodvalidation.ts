import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First Name is required',
      }),

      lastName: z.string({
        required_error: 'Last Name is required',
      }),
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    phoneNumber: z.string({
      required_error: 'phone number is required',
    }),
    password: z.string().optional(),
    budget: z.number({
      required_error: 'budget is required',
    }),
    income: z.number({
      required_error: 'Income is required',
    }),
  }),
})

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
       
      }),
      phoneNumber: z.string({
        required_error: 'Contact number is required',
      }),
      role:z.string({
        required_error:'Role is required'
      }),
      address: z.string({
        required_error:'Address is required'
      }),
      
    }),
  }),
});
export const UserValidation = {
  createUserZodSchema,
  createAdminZodSchema
}
