import { z } from 'zod'
import { captchaValidation, emailValidation } from '@/shared/schemas/BaseSchemes'


export const forgotPasswordFormSchema = emailValidation.merge(captchaValidation)

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>