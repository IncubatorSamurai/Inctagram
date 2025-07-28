export type GetUsersResponse = {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  prevCursor: number
  nextCursor: number
  items: Item[]
}

export type GetUsersRequest = {
  search?: string
  pageSize?: number
  pageNumber?: number
  cursor?: number
}

type Item = {
  id: number
  userName: string
  firstName?: string | null
  lastName?: string | null
  avatars: Avatar[]
  createdAt: string
}

type Avatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}

export type GetUserRequest = {
  userName: string
}

export type GetUserResponse = {
  id: number
  userName: string
  firstName: string
  lastName: string
  city: string
  country: string
  region: string
  dateOfBirth: string
  aboutMe: string
  avatars: Avatar[]
  isFollowing: boolean
  isFollowedBy: boolean
  followingCount: number
  followersCount: number
  publicationsCount: number
}

export type FollowRequest = {
  selectedUserId: number
}

export type unFollowRequest = {
  userId: number
}

export type Followers = {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  prevCursor: number
  nextCursor: number
  items: FollowerItem[]
}

export type FollowerItem = {
  id: number
  userId: number
  userName: string
  createdAt: string
  avatars: Avatar[]
  isFollowing: boolean
  isFollowedBy: boolean
}

export type GetFollowersRequest = {
  userName: string
  search?: string
  cursor?: number
  pageSize?: number
  pageNumber?: number
}
