import { z } from 'zod'
import { firstAndLastNameValidation, nameValidation, passwordValidation } from '../lib'

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

export const name = z
  .string()
  .min(nameValidation.MIN_LENGTH, {
    message: `Minimum number of characters ${nameValidation.MIN_LENGTH}`,
  })
  .max(nameValidation.MAX_LENGTH, {
    message: `Maximum number of characters ${nameValidation.MAX_LENGTH}`,
  })
  .regex(nameValidation.REGEX, { message: nameValidation.ERROR_MESSAGES.PATTERN })
  .default('')

export const agree = z.boolean().default(false)

export const email = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .default('')

export const captcha = z.string().min(1, 'Captha is required').default('')

export const firstName = z
  .string()
  .min(1, 'First Name is required')
  .max(50, 'Maximum number of characters is 50')
  .regex(firstAndLastNameValidation.REGEX, { message: firstAndLastNameValidation.ERROR_MESSAGES.PATTERN })
  .default('')

  export const lastName = z
  .string()
  .min(1, 'Last Name is required')
  .max(50, 'Maximum number of characters is 50')
  .regex(firstAndLastNameValidation.REGEX, { message: firstAndLastNameValidation.ERROR_MESSAGES.PATTERN })
  .default('')
