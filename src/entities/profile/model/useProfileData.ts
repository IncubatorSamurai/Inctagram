import { useEffect, useState } from 'react'
import { PostModel } from '@/shared/api/post/postApi.types'
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver'
import { useParams } from 'next/navigation'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useGetPublicProfileQuery } from '@/shared/api/publicUser/publicUserApi'
import {
  useGetPostsByUserNameQuery,
  useLazyGetPostsByUserNameQuery,
} from '@/shared/api/post/postApi'

export const useProfileData = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [posts, setPosts] = useState<PostModel[]>([])
  const { isInView, targetRef } = useIntersectionObserver({ threshold: 0.5 })

  const params = useParams()
  const { id } = params
  const userId = id?.[0] ?? ''
  const postId = id?.[1] ?? ''

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

  const { data: profilePosts } = useGetPostsByUserNameQuery(
    { pageNumber: 1, pageSize: 8, userName },
    { skip: !userName }
  )

  useEffect(() => {
    if (profilePosts) {
      setPosts(profilePosts.items)
    }
  }, [profilePosts])

  const [getNextPosts, { data: nextDataPosts, isFetching, isSuccess }] =
    useLazyGetPostsByUserNameQuery()

  useEffect(() => {
    if (isSuccess && nextDataPosts) {
      setPosts(prev => [...prev, ...nextDataPosts.items])
    }
  }, [isSuccess, nextDataPosts])

  const totalCount = profilePosts?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / 8)
  const isSetNextPage = isInView && pageNumber < totalPages

  useEffect(() => {
    if (isSetNextPage && !isFetching && pageNumber <= totalPages) {
      setPageNumber(prev => prev + 1)
      getNextPosts({ pageNumber: pageNumber + 1, pageSize: 8, userName })
    }
  }, [isSetNextPage, isFetching, getNextPosts, pageNumber, userName])

  return { avatarSrc, isMyProfile, userName, followArray, posts, targetRef, aboutMe, postId }
}
