import { z } from 'zod'

export const linkExpiredFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
})

export type LinkExpiredData = z.infer<typeof linkExpiredFormSchema>
