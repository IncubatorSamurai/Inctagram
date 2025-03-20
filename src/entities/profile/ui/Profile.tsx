'use client'
import s from './Profile.module.scss'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { BlankCover } from '@/shared/ui/profile/blankCover/BlankCover'
import { useTranslations } from 'next-intl'
import { useProfileData } from '@/entities/profile/model/useProfileData'

export const ProfilePage = () => {
  const tProfile = useTranslations('profile')

  const { avatarSrc, isMyProfile, userName, followArray, posts, targetRef, aboutMe } =
    useProfileData()

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
              <Button variant={'secondary'}>{tProfile('profileSettings')}</Button>
            ) : (
              <div className={s.followButtons}>
                <Button variant={'primary'}>{tProfile('follow')}</Button>
                <Button variant={'secondary'}>{tProfile('sendMessage')}</Button>
              </div>
            )}
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
