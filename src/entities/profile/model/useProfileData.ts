import { useParams } from 'next/navigation'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useGetPublicProfileQuery } from '@/shared/api/publicUser/publicUserApi'

export const useProfileData = () => {
  const params = useParams()
  const { userId: id } = params
  const userId = id as string

  const { data: meData } = useMeQuery()
  const isMyProfile = meData?.userId === Number(userId)

  const { data: publicInfoProfile } = useGetPublicProfileQuery({ profileId: userId as string })
  const userName = publicInfoProfile?.userName as string
  const avatarSrc = publicInfoProfile?.avatars[0]?.url

  const followArray = [
    publicInfoProfile?.userMetadata.following ? publicInfoProfile?.userMetadata.following : 0,
    publicInfoProfile?.userMetadata.followers ? publicInfoProfile?.userMetadata.followers : 0,
    publicInfoProfile?.userMetadata.publications ? publicInfoProfile?.userMetadata.publications : 0,
  ]

  const aboutMe = publicInfoProfile?.aboutMe

  return { avatarSrc, isMyProfile, userName, followArray, aboutMe, userId }
}
