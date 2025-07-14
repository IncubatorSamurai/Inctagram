export type Followers = {
  totalCount: number,
  pagesCount: number,
  page: number,
  pageSize: number,
  prevCursor: number,
  nextCursor: number,
  items: Item[]
}

type Avatar = {
        url: string,
        width: number,
        height: number,
        fileSize: number,
        createdAt: string
}
export type UserName = {
    name: string
}

export type Item = {
    id: number,
    userId: number,
    userName: string,
    createdAt: string,
    avatars: Avatar[],
    isFollowing: boolean,
    isFollowedBy: boolean
}