import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Id is required',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
};
