import { z } from 'zod'
import { confirmPassword, newPassword } from './baseSchemes'
import { passwordValidation } from '../lib'

export const createNewPasswordFormSchema = z
  .object({
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: passwordValidation.ERROR_MESSAGES.MISMATCH,
    path: ['confirmPassword'],
  })

export type CreateNewPasswordFormSchema = z.infer<typeof createNewPasswordFormSchema>
