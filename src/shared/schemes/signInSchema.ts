import { z } from 'zod'

export const SignInSchema = z.object({
  password: z.string().min(1, 'This field cannot be empty'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
})

export type SignInSchemaData = z.infer<typeof SignInSchema>
