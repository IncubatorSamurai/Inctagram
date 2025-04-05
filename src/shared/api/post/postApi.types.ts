export type ChildrenMetadata = {
  uploadId: string
}

export type CreatePostArgs = {
  description: string
  childrenMetadata: ChildrenMetadata[]
}

export type CreatePostResponse = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: Image[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: Owner;
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: boolean;
}

export type Owner = {
  firstName: string;
  lastName: string;
}

export type Image = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
}

export type UploadImageForPostResponse = {
  images: Image[]
}