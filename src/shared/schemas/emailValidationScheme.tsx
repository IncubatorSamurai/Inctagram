import { z } from 'zod'

export const emailValidationScheme = z.object({
  email: z.string().min(1, 'Email is required').email(`The email must match the format {example@example.com}`),
  captcha: z.string().optional(),
})

export type ForgotArgsData = z.infer<typeof emailValidationScheme>
