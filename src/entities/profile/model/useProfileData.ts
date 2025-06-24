import { useMeQuery } from '@/shared/api/auth/authApi'
import { ProfileUserResponse } from '@/shared/api/publicUser/publicUserApi.types'
import { useGetUserQuery } from '@/shared/api/users/usersApi'
import { useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { useParams } from 'next/navigation'

type Props = {
  resPublicData?: ProfileUserResponse
}

export const useProfileData = ({ resPublicData }: Props) => {
  const params = useParams()
  const { userId: id } = params
  const userId = id as string
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data: meData, isLoading: meLoading } = useMeQuery()
  const isMyProfile = meData?.userId === Number(userId)

  const { data: user, isLoading: dataLoading } = useGetUserQuery({
    userName: resPublicData?.userName as string,
  })

  const isLoading = meLoading || dataLoading

  const userName = user?.userName as string
  const avatarSrc = user?.avatars[0]?.url
  const aboutMe = user?.aboutMe
  const isFollowing = user?.isFollowing || false

  const followArray = [
    user?.followingCount || 0,
    user?.followersCount || 0,
    user?.publicationsCount || 0,
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
