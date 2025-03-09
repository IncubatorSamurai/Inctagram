import { z } from 'zod'
import { captcha, email } from '@/shared/schemes/baseSchemes'

export const forgotPasswordFormSchema = z.object({
  email,
  captcha,
})

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>
