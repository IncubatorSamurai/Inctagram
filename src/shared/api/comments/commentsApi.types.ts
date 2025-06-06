export type CreateComment = {
  postId: string
  content: string
}

export type CommentResponse = {
  id: number,
  postId: number,
  from: FromType,
  constent: string,
  createdAt: string,
  answerCount: number,
  likeCount: number,
  isLiked: boolean
}

type FromType = {
  id: number,
  username: string,
  avatars: Avatars[]
}

type Avatars = {
  url: string
}