export type ImageModel = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

export type UploadPhotoRespond = {
  images: ImageModel[],
};



export type User = {
  firstName: string;
  lastName: string;
};

export type Post = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: ImageModel[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: User;
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: boolean;
};

export type PublicPostsResponse = {
  totalCount: number;
  pageSize: number;
  totalUsers: number;
  items: Post[];
};

export type PublicPostsRequest = {
  endCursorPostId?: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};
type Avatar = {
  url?: string;
};

type CommentAuthor = {
  id: number;
  username: string;
  avatars: Avatar[];
};


export type Comment = {
  id: number;
  postId: number;
  from: CommentAuthor
  content: string;
  createdAt: string;
  answerCount: number;
  likeCount: number;
  isLiked: boolean;
};

export type CommentsResponse = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: Comment[];
};


