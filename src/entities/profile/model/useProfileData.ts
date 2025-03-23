import { useParams } from 'next/navigation'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useGetPublicProfileQuery } from '@/shared/api/publicUser/publicUserApi'
import { MeResponse } from '@/shared/api/auth/authApi.types'
import { ProfileUserResponse } from '@/shared/api/publicUser/publicUserApi.types'
import { useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store/appSlice/appSlice'

type Props = {
  resMeData: MeResponse
  resPublicData: ProfileUserResponse
}

export const useProfileData = ({ resMeData, resPublicData }: Props) => {
  const params = useParams()
  const { userId: id } = params
  const userId = id as string
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data: meData = resMeData } = useMeQuery(undefined, { skip: !!resMeData })
  const isMyProfile = meData?.userId === Number(userId)

  const { data: publicInfoProfile = resPublicData } = useGetPublicProfileQuery(
    { profileId: userId as string },
    { skip: !!resPublicData }
  )
  const userName = publicInfoProfile?.userName as string
  const avatarSrc = publicInfoProfile?.avatars[0]?.url

  const followArray = [
    publicInfoProfile?.userMetadata.following ? publicInfoProfile?.userMetadata.following : 0,
    publicInfoProfile?.userMetadata.followers ? publicInfoProfile?.userMetadata.followers : 0,
    publicInfoProfile?.userMetadata.publications ? publicInfoProfile?.userMetadata.publications : 0,
  ]

  const aboutMe = publicInfoProfile?.aboutMe

  return { avatarSrc, isMyProfile, isLoggedIn, userName, followArray, aboutMe, userId }
}
