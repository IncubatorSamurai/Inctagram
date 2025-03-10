import { z } from 'zod'
import { name, email, agree, newPassword, confirmPassword } from './baseSchemes'
import { agreeValidation, passwordValidation } from '../lib'

export const signUpFormSchema = z
  .object({
    name: name,
    email: email,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
    agree: agree,
  })
  .refine(data => data.agree === true, {
    message: agreeValidation.MISMATCH,
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: passwordValidation.ERROR_MESSAGES.MISMATCH,
    path: ['confirmPassword'],
  })

export type FormSignUP = z.infer<typeof signUpFormSchema>
