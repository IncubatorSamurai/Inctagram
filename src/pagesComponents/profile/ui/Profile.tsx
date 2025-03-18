'use client'
import s from './Profile.module.scss'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useParams } from 'next/navigation'
import { useGetPublicProfileQuery } from '@/shared/api/publicUser/publicUserApi'
import { BlankCover } from '@/shared/ui/profile/blankCover/BlankCover'
import {
  useGetPostsByUserNameQuery,
  useLazyGetPostsByUserNameQuery,
} from '@/shared/api/post/postApi'
import { useEffect, useState } from 'react'
import { PostModel } from '@/shared/api/post/postApi.types'
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver'

export const ProfilePage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [posts, setPosts] = useState<PostModel[]>([])
  const { isInView, targetRef } = useIntersectionObserver({ threshold: 0.5 })

  const params = useParams()
  const { userId } = params
  const { data: meData } = useMeQuery()
  const isMyProfile = meData?.userId === Number(userId)

  const { data: publicInfoProfile } = useGetPublicProfileQuery({ profileId: userId as string })
  const userName = publicInfoProfile?.userName as string

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
    if (isSetNextPage && !isFetching) {
      setPageNumber(prev => prev + 1)
      getNextPosts({ pageNumber: pageNumber + 1, pageSize: 8, userName })
    }
  }, [isSetNextPage, isFetching, getNextPosts, pageNumber, userName])

  const avatarSrc = publicInfoProfile?.avatars[0]?.url

  const followArray = [
    publicInfoProfile?.userMetadata.following ? publicInfoProfile?.userMetadata.following : 0,
    publicInfoProfile?.userMetadata.followers ? publicInfoProfile?.userMetadata.followers : 0,
    publicInfoProfile?.userMetadata.publications ? publicInfoProfile?.userMetadata.publications : 0,
  ]

  return (
    <div className={s.profilePage}>
      <section className={s.profile}>
        {avatarSrc ? (
          <Image
            src={avatarSrc ?? null}
            className={s.avatar}
            width={200}
            height={200}
            alt={'avatar'}
          />
        ) : (
          <BlankCover />
        )}
        <div className={s.profileInfo}>
          <div className={s.name}>
            <Typography variant={'h1'}>{userName}</Typography>
            {isMyProfile ? (
              <Button variant={'secondary'}>Profile Settings</Button>
            ) : (
              <div className={s.followButtons}>
                <Button variant={'primary'}>Follow</Button>
                <Button variant={'secondary'}>Send Message</Button>
              </div>
            )}
          </div>
          <div className={s.statistics}>
            {followArray.map((item, i) => (
              <li key={i} className={s.followInfoItem}>
                <Typography variant={'bold_text_14'}>{item}</Typography>
                <Typography variant={'regular_text_14'}>
                  {i === 0 && 'Following'}
                  {i === 1 && 'Followers'}
                  {i === 2 && 'Publications'}
                </Typography>
              </li>
            ))}
          </div>
          <Typography>{publicInfoProfile?.aboutMe}</Typography>
        </div>
      </section>
      <section className={s.posts}>
        {userName &&
          posts.map((post, id) => (
            <div
              key={post.id}
              className={s.postWrapper}
              ref={id === posts.length - 1 ? targetRef : null}
            >
              <Image src={post.images[0]?.url ?? null} className={s.post} fill alt={'post'} />
            </div>
          ))}
      </section>
    </div>
  )
}
