import { EditProfileForm } from '@/features/settings/editUserProfileForm/model/schema'

const LOCAL_STORAGE_KEY = 'dataPrev'

export const saveProfileToStorage = (form: EditProfileForm) => {
  const data = {
    userName: form.name,
    firstName: form.firstName,
    lastName: form.lastName,
    dateOfBirth: form.birthDate?.toISOString() || '',
    aboutMe: form.textarea,
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
}

export const getProfileFromStorage = (): EditProfileForm | null => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!data) return null

  try {
    const parsed = JSON.parse(data)
    return {
      name: parsed.userName,
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      birthDate: new Date(),
      textarea: parsed.aboutMe,
    }
  } catch {
    return null
  }
}

export const clearProfileStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}
