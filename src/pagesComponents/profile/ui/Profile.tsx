'use client'
import s from './Profile.module.scss'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useParams } from 'next/navigation'
import { useGetPublicProfileQuery } from '@/shared/api/publicUser/publicUserApi'
import { BlankCover } from '@/shared/ui/profile/blankCover/BlankCover'
import { useGetPostsByUserNameQuery } from '@/shared/api/post/postApi'

export const ProfilePage = () => {
  const params = useParams()
  const { userId } = params
  const { data: meData } = useMeQuery()
  const isMyProfile = meData?.userId === Number(userId)
  const { data: publicInfoProfile } = useGetPublicProfileQuery({ profileId: userId as string })
  const { data: profilePosts } = useGetPostsByUserNameQuery({
    userName: publicInfoProfile?.userName as string,
  })

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
            <Typography variant={'h1'}>{publicInfoProfile?.userName}</Typography>
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
        {publicInfoProfile?.userName &&
          profilePosts?.items.map(post => (
            <Image
              key={post.id}
              src={post.images[0]?.url ?? null}
              className={s.post}
              width={234}
              height={228}
              alt={'post'}
            />
          ))}
      </section>
    </div>
  )
}
