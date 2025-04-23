import { name, profileName } from '@/shared/schemes/baseSchemes'
import { z } from 'zod'

const isAdult = (date: Date) => {
  const today = new Date()
  const age = today.getFullYear() - date.getFullYear()
  const month = today.getMonth() - date.getMonth()
  const day = today.getDate() - date.getDate()

  if (age > 13 || (age === 13 && (month > 0 || (month === 0 && day == 0)))) {
    return true
  } else {
    return false
  }
}

export const editProfileSchema = z.object({
  name: name,
  firstName: profileName,
  lastName: profileName,
  birthDate: z.date().refine(isAdult),
  textarea: z.string().optional(),
})

export type EditProfileForm = z.infer<typeof editProfileSchema>
