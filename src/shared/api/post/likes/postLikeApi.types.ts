type LikeStatus = 'NONE' | 'LIKE' | 'DISLIKE'

export type PostLikesStatus = {
  id: number
  likeStatus: LikeStatus
}

export type Avatars = {
  url: string
  createdAt: string
  fileSize: number
  height: number
  width: number
}
export type PostLikeItem = {
  avatars: Avatars[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export type PostLike = {
  isLiked: boolean
  items: PostLikeItem[]
  nextCursor: null | number
  page: number
  pageSize: number
  prevCursor: number
  totalCount: number
  pagesCount: number
}

export type PostLikeRequest = {
  postId: number
  search?: string
  pageSize?: number
  pageNumber?: number
  cursor?: number
}

export type PostLikeRequest = {
  id: number
  search?: string
}
