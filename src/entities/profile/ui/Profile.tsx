'use client'
import s from './Profile.module.scss'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { BlankCover } from '@/shared/ui/profile/blankCover/BlankCover'
import { useTranslations } from 'next-intl'
import { useProfileData } from '@/entities/profile/model/useProfileData'
import { UserPosts } from '@/entities/profile/ui/posts/UserPosts'
import { ProfileUserResponse } from '@/shared/api/publicUser/publicUserApi.types'
import { GetPostsByUserIdRespond } from '@/shared/api/post/postApi.types'
import Link from 'next/link'

type Props = {
  resPublicData?: ProfileUserResponse
  resPublicPosts?: GetPostsByUserIdRespond
}

export const Profile = ({ resPublicData, resPublicPosts }: Props) => {
  const tProfile = useTranslations('profile')

  const { avatarSrc, isMyProfile, isLoggedIn, userName, followArray, aboutMe, userId } =
    useProfileData({
      resPublicData,
    })

  return (
    <div className={s.profilePage}>
      <section className={s.profile}>
        {avatarSrc ? (
          <Image src={avatarSrc} className={s.avatar} width={200} height={200} alt={'avatar'} />
        ) : (
          <BlankCover />
        )}
        <div className={s.profileInfo}>
          <div className={s.name}>
            <Typography variant={'h1'}>{userName}</Typography>
            {isMyProfile ? (
              <Button variant={'secondary'} asChild>
                <Link href={'/profile/settings'}> {tProfile('profileSettings')}</Link>
              </Button>
            ) : isLoggedIn ? (
              <div className={s.followButtons}>
                <Button variant={'primary'}>{tProfile('follow')}</Button>
                <Button variant={'secondary'}>{tProfile('sendMessage')}</Button>
              </div>
            ) : null}
          </div>
          <div className={s.statistics}>
            {followArray.map((item, i) => (
              <li key={i} className={s.followInfoItem}>
                <Typography variant={'bold_text_14'}>{item}</Typography>
                <Typography variant={'regular_text_14'}>
                  {i === 0 && tProfile('following')}
                  {i === 1 && tProfile('followers')}
                  {i === 2 && tProfile('publications')}
                </Typography>
              </li>
            ))}
          </div>
          <Typography>{aboutMe}</Typography>
        </div>
      </section>
      <UserPosts userId={userId} resPublicPosts={resPublicPosts} />
    </div>
  )
}
