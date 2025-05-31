export type CommentLikeUser = {
  id: number
  userId: number
  userName: string
  createdAt: string
  avatars: {
    url: string
    width: number
    height: number
    fileSize: number
    createdAt: string
  }[]
  isFollowing: boolean
  isFollowedBy: boolean
}

export type GetCommentLikesResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: CommentLikeUser[]
}
export type GetCommentLikesArg = {
  postId: number
  commentId: number
  search?: string
  pageSize?: number
  pageNumber?: number
  cursor: number
}
export type GetCommentsAnswersArg = Omit<GetCommentLikesArg, 'cursor'> & {
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}
export type UpdateCommentLikesArg = {
  postId: number
  commentId: number
  likeStatus: 'LIKE' | 'NONE'
}
export type postAnswerCommentArg = Omit<UpdateCommentLikesArg, 'likeStatus'> & {
  content: string
}
export type UpdateCommentAnswersLikesArg = UpdateCommentLikesArg & {
  answerId: number
}

export type UpdateCommentLikesResponse = {
  likeStatus: 'NONE' | 'LIKE'
}
export type Answer = {
  id: number
  commentId: number
  from: {
    id: number
    username: string
    avatars: { url?: string }[]
  }
  content: string
  createdAt: string
  likeCount: number
  isLiked: boolean
}

export type AnswersResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: Answer[]
}
