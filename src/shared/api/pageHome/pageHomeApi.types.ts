export type PublicationsFollowersArgs = {
  pageSize: number
  pageNumber?: number
  endCursorPostId?: number | null
}

export type HomePagePostsRespond = {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  prevCursor: number
  nextCursor: number | null
  items: Post[]
}

export type ImageProps = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

type Owner = {
  firstName: string
  lastName: string
}

export type Post = {
  id: number
  userName: string
  description: string
  location: string
  images: ImageProps[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: Owner
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: string[]
}

export type PostLike = Pick<Post, 'avatarWhoLikes' | 'likesCount' | 'id'>
export type PostInteraction = Pick<Post, 'isLiked' | 'avatarOwner' | 'description' | 'id'>
