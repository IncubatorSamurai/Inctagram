import { name, profileName } from '@/shared/schemes/baseSchemes'
import { z } from 'zod'

export const editProfileSchema = z.object({
  name: name,
  firstName: profileName,
  lastName: profileName,
  //   dateOfBirth: confirmPassword,
  //   aboutMe: agree,
})

export type EditProfileForm = z.infer<typeof editProfileSchema>
