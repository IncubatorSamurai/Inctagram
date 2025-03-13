type ImageModel = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

type PostModel = {
  id: number
  userName: string
  description: string
  location: string
  images: [
    {
      url: string
      width: number
      height: number
      fileSize: number
      createdAt: string
      uploadId: string
    },
  ]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: {
    firstName: string
    lastName: string
  }
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}

export type UploadPhotoRespond = {
  images: ImageModel[]
}

export type GetPostsByNameRespond = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: PostModel[]
}
