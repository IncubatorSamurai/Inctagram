import { authApi, useMeQuery } from '@/shared/api/auth/authApi'
import { ProfileUserResponse } from '@/shared/api/publicUser/publicUserApi.types'
import { useGetUserQuery } from '@/shared/api/users/usersApi'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { useParams } from 'next/navigation'
import { GetUserResponse } from '@/shared/api/users/usersApi.types'
import { MeResponse } from '@/shared/api/auth/authApi.types'
import { useEffect, useRef } from 'react'

type Props = {
  resPublicData?: ProfileUserResponse | GetUserResponse
  me?: MeResponse
}

export const useProfileData = ({ resPublicData, me }: Props) => {
  const needInit = useRef(!!me)
  const dispatch = useAppDispatch()
  const params = useParams()
  const { userId: id } = params
  const userId = id as string
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data: meData } = useMeQuery()
  const isMyProfile = meData?.userId === Number(userId)

  const { data: user } = useGetUserQuery({
    userName: resPublicData?.userName as string,
  })

  useEffect(() => {
    if (needInit.current && me) {
      dispatch(authApi.util.upsertQueryData('me', undefined, me))
      needInit.current = false
    }
  }, [me])

  useEffect(() => {
    return () => {
      dispatch(authApi.util.resetApiState())
    }
  }, [])

  const userName = user?.userName as string
  const avatarSrc = user?.avatars[0]?.url
  const aboutMe = user?.aboutMe
  const isFollowing = user?.isFollowing || false

  const followArray = [
    user?.followingCount || 0,
    user?.followersCount || 0,
    user?.publicationsCount || 0,
  ]

  return { avatarSrc, isMyProfile, isLoggedIn, userName, followArray, aboutMe, userId, isFollowing }
}
