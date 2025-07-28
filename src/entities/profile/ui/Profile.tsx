'use client'
import { useProfileData } from '@/entities/profile/model/useProfileData'
import { UserPosts } from '@/entities/profile/ui/posts/UserPosts'
import { FollowButton } from '@/features/followUser'
import { GetPostsByUserIdRespond } from '@/shared/api/post/postApi.types'
import { ProfileUserResponse } from '@/shared/api/publicUser/publicUserApi.types'
import { Button } from '@/shared/ui/button'
import { BlankCover } from '@/shared/ui/profile/blankCover/BlankCover'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import s from './Profile.module.scss'
import { Loader } from '@/shared/ui/loader'
import { FollowersModal } from './followers/modal/FollowersModal'


type Props = {
  resPublicData?: ProfileUserResponse
  resPublicPosts?: GetPostsByUserIdRespond
}

export const Profile = ({ resPublicData, resPublicPosts }: Props) => {
  const t = useTranslations('profile')

  const {
    avatarSrc,
    isMyProfile,
    isLoggedIn,
    userName,
    followArray,
    aboutMe,
    userId,
    isFollowing,
    isLoading,
  } = useProfileData({
    resPublicData,
  })

  if (isLoading && !resPublicPosts && !resPublicData) {
    return (
      <div className={s.loader}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={s.profilePage}>
      <section className={s.profile}>
        {avatarSrc && typeof avatarSrc === 'string' ? (
          <Image src={avatarSrc} className={s.avatar} width={200} height={200} alt={'avatar'} />
        ) : (
          <BlankCover />
        )}
        <div className={s.profileInfo}>
          <div className={s.name}>
            <Typography variant={'h1'}>{userName}</Typography>
            {isMyProfile ? (
              <Button variant={'secondary'} asChild>
                <Link href={'/profile/settings'}> {t('profileSettings')}</Link>
              </Button>
            ) : isLoggedIn ? (
              <div className={s.followButtons}>
                <FollowButton userId={+userId} userName={userName} isFollowing={isFollowing} />
                <Button variant="secondary">{t('sendMessage')}</Button>
              </div>
            ) : null}
          </div>
          <div className={s.statistics}>
            {followArray.map((item, i) => (
              <li key={i} className={s.followInfoItem}>
                {i === 0 && (
                  <>
                    <Typography variant={'bold_text_14'}>{item}</Typography>
                    <Typography variant={'regular_text_14'}>{t('following')}</Typography>
                  </>
                )}
                {i === 1 && <FollowersModal fCount={item} userName={userName} />}
                {i === 2 && (
                  <>
                    <Typography variant={'bold_text_14'}>{item}</Typography>
                    <Typography variant={'regular_text_14'}>{t('publications')}</Typography>
                  </>
                )}
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
