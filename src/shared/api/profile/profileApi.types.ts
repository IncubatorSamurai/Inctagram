export type UploadAvatarRequest = {
  file: File
}
type AvatarInfo = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

export type UploadAvatarResponse = {
  avatars: AvatarInfo[]
}
type IAvatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}
export type ProfileResponse = {
  id: string
  userName: string
  firstName: string
  lastName: string
  city: string
  country: string
  region: string
  dateOfBirth: string
  aboutMe: string
  avatars: IAvatar[]
  createdAt: string
}
export type ProfileUpdateRequest = Omit<ProfileResponse, 'id' | 'avatars' | 'createdAt'>
