import { z } from 'zod'

export const emailValidation = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
})
export const captchaValidation = z.object({ captcha: z.string().min(1, 'Captha is required') })
