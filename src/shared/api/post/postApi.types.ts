export type ChildrenMetadata = {
  uploadId: string
}
export type AvatarProfile = {
  id: string
  fileUrl: string
  type: string
}
export type CreatePostArgs = {
  description: string
  childrenMetadata: ChildrenMetadata[]
}

export type CreatePostResponse = {
  id: number
  userName: string
  description: string
  location: string
  images: Image[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: Owner
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}

export type Owner = {
  firstName: string | null
  lastName: string | null
}

export type Image = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export type UploadImageForPostResponse = {
  images: Image[]
}

export type PostModel = {
  id: number
  userName: string
  description: string
  location: string
  images: ImageModel[]
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

export type ImageModel = {
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

export type GetPostsByNameRespond = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: PostModel[]
}

export type GetPostsByNameArgs = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: string
  userName: string
}

export type GetPostsByUserIdArgs = Omit<GetPostsByNameArgs, 'userName' | 'pageNumber'> & {
  userId: string
  endCursorPostId?: string | null
}

export type GetCommentsByPostIdArgs = Omit<GetPostsByNameArgs, 'userName'> & {
  postId: number
}

export type GetPostsByUserIdRespond = Omit<GetPostsByNameRespond, 'notReadCount'> & {
  totalUsers: number
}

export type PostDescriptionChange = {
  id: number
  description?: string
}

export type PostId = {
  id: number
}

export type ResponseGetById = {
  id: number
  userName: string
  description: string
  location: null
  images: ImageModel[]
  createdAt: string
  updatedAt: string
  ownerId: number
  owner: Owner
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: string[]
}

export type User = {
  firstName: string
  lastName: string
}

export type Post = {
  id: number
  userName: string
  description: string
  location: string
  images: ImageModel[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: User
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}

export type PublicPostsResponse = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: Post[]
}

export type PublicPostsRequest = {
  endCursorPostId?: number
  pageSize: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

type Avatar = {
  url?: string
}

type CommentAuthor = {
  id: number
  username: string
  avatars: Avatar[]
}

export type Comment = {
  id: number
  postId: number
  from: CommentAuthor
  content: string
  createdAt: string
  answerCount: number
  likeCount: number
  isLiked: boolean
}

export type CommentsResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: Comment[]
}

export type Name = {
  name: string
}

export type ResponseGetByName = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: ResponseGetById[]
}

export type DeleteImageForPostArgs = {
  uploadId: string
}

export type CreateComment = {
  postId: string
  content: string
}

export type CommentResponse = {
  id: number
  postId: number
  from: FromType
  constent: string
  createdAt: string
  answerCount: number
  likeCount: number
  isLiked: boolean
}

type FromType = {
  id: number
  username: string
  avatars: Avatars[]
}

type Avatars = {
  url: string
}
