import { emailValidationScheme } from '@/shared/schemas/emailValidationScheme'
import { z } from 'zod'

export const SignInSchema = z
  .object({
    password: z.string().min(1, 'This field cannot be empty'),
  })
  .merge(emailValidationScheme)

export type SignInSchemaData = z.infer<typeof SignInSchema>
