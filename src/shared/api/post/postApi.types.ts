type ImageModel = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export type UploadPhotoRespond = {
  images: ImageModel[]
}

export type PostDescriptionChange = {
  id: number
  description?: string
}

type Owner = {
  firstName: string | null,
  lastName: string | null
}

export type ResponseGetById = {
  id: number,
  userName: string,
  description: string,
  location: null,
  images: ImageModel[],
  createdAt: string,
  updatedAt: string,
  ownerId: number,
  owner: Owner,
  likesCount: number,
  isLiked: boolean,
  avatarWhoLikes: string[]
}

export type Name = {
  name: string
}

export type ResponseGetByName = {
    pageSize: number,
    totalCount: number,
    notReadCount: number,
    items: ResponseGetById[]

}