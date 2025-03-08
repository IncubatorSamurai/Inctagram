import { z } from 'zod'

 const NameValidation = {
    MIN_LENGTH: 6,
    MAX_LENGTH: 30,
    REGEX: /^[a-zA-Z0-9_-]+$/,
    ERROR_MESSAGES: {
      PATTERN:
        'Name must contain a-z A-Z 0-9 _ - ',
      MISMATCH: 'The passwords must match',
    },
  } as const

export const SignUpNameSchema = z.object({
name: z
      .string()
      .min(NameValidation.MIN_LENGTH, {
        message: `Minimum number of characters ${NameValidation.MIN_LENGTH}`,
      })
      .max(NameValidation.MAX_LENGTH, {
        message: `Maximum number of characters ${NameValidation.MAX_LENGTH}`,
      })
      .regex(NameValidation.REGEX, { message: NameValidation.ERROR_MESSAGES.PATTERN })
      .default('')
        
})

export type NameSchema = z.infer<typeof SignUpNameSchema>