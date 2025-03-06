import { z } from 'zod'

export const passwordValidation = {
  MIN_LENGTH: 6,
  MAX_LENGTH: 20,
  REGEX: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*["!#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]).+$/,
  ERROR_MESSAGES: {
    PATTERN:
      'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _` { | } ~',
    MISMATCH: 'The passwords must match',
  },
} as const

export const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(passwordValidation.MIN_LENGTH, {
        message: `Minimum number of characters ${passwordValidation.MIN_LENGTH}`,
      })
      .max(passwordValidation.MAX_LENGTH, {
        message: `Maximum number of characters ${passwordValidation.MAX_LENGTH}`,
      })
      .regex(passwordValidation.REGEX, { message: passwordValidation.ERROR_MESSAGES.PATTERN }),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: passwordValidation.ERROR_MESSAGES.MISMATCH,
    path: ['confirmPassword'],
  })

export type createNewPasswordFormSchema = z.infer<typeof passwordSchema>
