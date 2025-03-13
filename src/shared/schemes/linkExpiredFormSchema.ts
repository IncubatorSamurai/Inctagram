import { z } from 'zod'
import { email } from '@/shared/schemes/baseSchemes'

export const linkExpiredFormSchema = z.object({
  email: email,
})

export type LinkExpiredData = z.infer<typeof linkExpiredFormSchema>
