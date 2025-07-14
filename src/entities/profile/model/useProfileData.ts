import { useMeQuery } from '@/shared/api/auth/authApi'
import { ProfileUserResponse } from '@/shared/api/publicUser/publicUserApi.types'
import { useGetUserQuery } from '@/shared/api/users/usersApi'
import { useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { useParams } from 'next/navigation'
import { useGetPublicProfileQuery } from '@/shared/api/publicUser/publicUserApi'

type Props = {
  resPublicData?: ProfileUserResponse
}

export const useProfileData = ({ resPublicData }: Props) => {
  const params = useParams()
  const { userId: id } = params
  const userId = id as string
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data: meData, isLoading: meLoading } = useMeQuery(undefined, { skip: !isLoggedIn })
  const isMyProfile = meData?.userId === Number(userId)

  const { data: privateDataUser, isLoading: privateLoading } = useGetUserQuery(
    {
      userName: resPublicData?.userName as string,
    },
    { skip: !meData }
  )

  const { data: user, isLoading: dataLoading } = useGetPublicProfileQuery(
    { profileId: userId },
    { skip: !!meData }
  )

  const isLoading = meLoading || dataLoading || privateLoading

  const getSafeAvatar = (userData?: {
    avatars?: Array<{ url?: string }>
  }) => {
    return userData?.avatars?.[0]?.url || null
  }

  const userName = privateDataUser?.userName || (user?.userName as string)
  const avatarSrc = getSafeAvatar(privateDataUser) || getSafeAvatar(user)
  const aboutMe = privateDataUser?.aboutMe || user?.aboutMe
  const isFollowing = privateDataUser?.isFollowing || false

  // const userName = privateDataUser?.userName || (user?.userName as string)
  // const avatarSrc = privateDataUser?.avatars[0].url || user?.avatars[0]?.url
  // const aboutMe = privateDataUser?.aboutMe || user?.aboutMe
  // const isFollowing = privateDataUser?.isFollowing || false

  const followArray = [
    privateDataUser?.followingCount || user?.userMetadata.following || 0,
    privateDataUser?.followersCount || user?.userMetadata.followers || 0,
    privateDataUser?.publicationsCount || user?.userMetadata.publications || 0,
  ]

  return {
    avatarSrc,
    isMyProfile,
    isLoggedIn,
    userName,
    followArray,
    aboutMe,
    userId,
    isFollowing,
    isLoading,
  }
}
