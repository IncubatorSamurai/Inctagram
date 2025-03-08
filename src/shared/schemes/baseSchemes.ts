import { z } from 'zod'
import { passwordValidation } from '../lib'

export const newPassword = z
  .string()
  .min(passwordValidation.MIN_LENGTH, {
    message: `Minimum number of characters ${passwordValidation.MIN_LENGTH}`,
  })
  .max(passwordValidation.MAX_LENGTH, {
    message: `Maximum number of characters ${passwordValidation.MAX_LENGTH}`,
  })
  .regex(passwordValidation.REGEX, { message: passwordValidation.ERROR_MESSAGES.PATTERN })
  .default('')

export const confirmPassword = z.string().default('')
