export type PublicUserResponse = {
  totalCount: number
}

export type GetPublicProfileArgs = {
  profileId: string
}

export type ProfileUserResponse = {
  id: number
  userName: string
  aboutMe: string
  avatars: [
    {
      url: string
      width: number
      height: number
      fileSize: number
      createdAt: string
    },
  ]
  userMetadata: {
    following: number
    followers: number
    publications: number
  }
  hasPaymentSubscription: boolean
}
