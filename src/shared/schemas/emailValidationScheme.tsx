import { z } from 'zod'

export const emailValidationScheme = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  captcha: z.string().optional(),
})

export type ForgotArgsData = z.infer<typeof emailValidationScheme>
